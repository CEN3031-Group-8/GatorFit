"use client";

import React from "react";
import Post from "./PostCard";

const SocialFeed = (posts: any) => {
  posts = posts.posts
  return (
    <div className="max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto p-4 space-y-6">
      {posts.map((post: any, index: number) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
};

export default SocialFeed;