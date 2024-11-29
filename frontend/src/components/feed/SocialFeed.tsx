"use client";

import React from "react";
import Post from "./PostCard";

// test users
const users = [
  {
    name: "test1",
    profilePicture: "test.png",
  },
  {
    name: "test2",
    profilePicture: "test.png",
  },
];

// test posts
const posts = [
  {
    id: 1,
    user: users[0],
    profilePicture: "test.png",
    content: "test",
    likes: 10,
    image: "test.jpg",
    comments: [],
  },
  {
      id: 2,
      user: users[1],
      profilePicture: "test.png",
      content: "test",
      likes: 1123,
      image: "test.jpg",
      comments: [],
    },
];

const SocialFeed = () => {
  return (
    <div className="max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto p-4 space-y-6">
      {posts.map((post) => (
        <Post key={post.id} post={post} user={post.user} />
      ))}
    </div>
  );
};

export default SocialFeed;