import Chats from "./models/Chats.js";
import Post from "./models/Post.js";
import Stories from "./models/Stories.js";
import User from "./models/Users.js";

const SocketHandler = (socket, io) => {

  socket.on("postLiked", async ({ userId, postId }) => {
    try {
      await Post.updateOne(
        { _id: postId },
        { $addToSet: { likes: userId } }
      );

      io.emit("likeUpdated");
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("postUnLiked", async ({ userId, postId }) => {
    try {
      await Post.updateOne(
        { _id: postId },
        { $pull: { likes: userId } }
      );

      io.emit("likeUpdated");
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("fetch-profile", async ({ _id }) => {
    const user = await User.findOne({ _id });
    socket.emit("profile-fetched", { profile: user });
  });

  socket.on("updateProfile", async ({ userId, profilePic, username, about }) => {
    await User.updateOne(
      { _id: userId },
      { profilePic, username, about }
    );

    const user = await User.findOne({ _id: userId });
    socket.emit("profile-fetched", { profile: user });
  });

  socket.on("user-search", async ({ username }) => {
    const user = await User.findOne({ username });
    socket.emit("searched-user", { user });
  });

  socket.on("followUser", async ({ ownId, followingUserId }) => {
    await User.updateOne(
      { _id: ownId },
      { $addToSet: { following: followingUserId } }
    );

    await User.updateOne(
      { _id: followingUserId },
      { $addToSet: { followers: ownId } }
    );

    const user1 = await User.findOne({ _id: ownId });
    const user2 = await User.findOne({ _id: followingUserId });

    socket.emit("userFollowed", { following: user1.following });

    // FIXED CHAT ID CREATION
    if (
      user2.following.includes(user1._id) &&
      user1.following.includes(user2._id)
    ) {
      const chatId =
        user1._id.toString() > user2._id.toString()
          ? user1._id.toString() + user2._id.toString()
          : user2._id.toString() + user1._id.toString();

      const chatExists = await Chats.findOne({ _id: chatId });
      if (!chatExists) {
        await new Chats({ _id: chatId }).save();
      }
    }
  });

  socket.on("unFollowUser", async ({ ownId, followingUserId }) => {
    await User.updateOne(
      { _id: ownId },
      { $pull: { following: followingUserId } }
    );

    await User.updateOne(
      { _id: followingUserId },
      { $pull: { followers: ownId } }
    );

    const user = await User.findOne({ _id: ownId });
    socket.emit("userUnFollowed", { following: user.following });
  });

  socket.on("makeComment", async ({ postId, username, comment }) => {
    await Post.updateOne(
      { _id: postId },
      { $push: { comments: { username, comment } } }
    );

    io.emit("comment-added");
  });

  socket.on("fetch-all-posts", async () => {
    const posts = await Post.find();
    socket.emit("all-posts-fetched", { posts });
  });

  socket.on("delete-post", async ({ postId }) => {
    await Post.deleteOne({ _id: postId });
    const posts = await Post.find();
    io.emit("post-deleted", { posts });
  });

  socket.on("fetch-stories", async () => {
    const stories = await Stories.find();
    socket.emit("stories-fetched", { stories });
  });

  socket.on("story-played", async ({ storyId, userId }) => {
    await Stories.updateOne(
      { _id: storyId },
      { $addToSet: { viewers: userId } }
    );
  });

};

export default SocketHandler;
