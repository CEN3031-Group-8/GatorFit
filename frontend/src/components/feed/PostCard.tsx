"use client";

import React, { useState } from "react";

const PostCard = ({ post, user }: { post: any; user: any }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      setComments((prev) => [...prev, newComment.trim()]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-black text-white rounded-lg p-4">
      <div className="flex items-center mb-4">
        {post.profilePicture ? (
          <img
            src={post.profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-orange-500 rounded-full mr-3"></div>
        )}
        <span className="font-semibold">{post.user.name}</span> 
      </div>

      {post.image && (
        <div className="mb-4">
          <img
            src={post.image}
            alt="Post"
            className="w-full rounded-lg object-cover max-h-64"
          />
        </div>
      )}

      <p className="mb-4">{post.content}</p>

      <div className="flex items-center space-x-6 mb-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 p-2 ${
            liked ? "text-blue-500" : "text-white"
          }`}
          aria-label="Like"
        >
          <span>{liked ? "❤️" : "🤍"}</span>
          <span>{likeCount}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 p-2"
          aria-label="Comment"
        >
          <span>💬</span>
          <span>{comments.length}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-4">
          <form onSubmit={handleAddComment} className="flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-800 text-white p-2 rounded-l-md"
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 py-2 rounded-r-md text-white"
            >
              Post
            </button>
          </form>

          {comments.map((comment, index) => (
            <div key={index} className="bg-gray-900 p-2 rounded-md flex items-center space-x-3">
              <img
                src={user.profilePicture}
                alt="Current User"
                className="w-8 h-8 rounded-full"
              />
              <div>
                <span className="font-semibold">{user.name}</span>
                <p>{comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;