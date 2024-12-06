"use client"
import React, { useState } from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { deletePost } from "@/actions";

const PostCard = ({ post, deletePost }: { post: any, deletePost: any}) => {
 // Function to capitalize and format text
  const formatText = (text: string): string => {
      return text
      .split('-') // Split by hyphen
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words with a space
  };

  const result: string[] = [];
  post.workout.exercises.forEach((exercise: any) => {
    const [rawTitle, rawType] = exercise.title.split('|');
    const exerciseTitle = formatText(rawTitle);

    result.push("\n" + exerciseTitle);
    exercise.sets.forEach((set:any, index: any) => {
      result.push(`Set ${index + 1}: ${set.reps} reps @ ${set.weight} lbs`)
    });
  });
  const workoutText =  result.join("\n");

  return (
    <div className="border border-white rounded-md p-4">
      <div className="flex justify-end">
      <DropdownMenu>
                <DropdownMenuTrigger>          
                <DotsVerticalIcon width="20" height="20"/>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="bg-[#0B0B09] text-white mt-2 mr-2">
                <DropdownMenuItem onClick={deletePost}>Delete Post</DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="mb-4 whitespace-pre-line">
        {post.message + "\n"}
        {workoutText}
      </p>
    </div>
  );
};


export const Posts = (newPosts: any) => {
  const [posts, setPosts] = useState(newPosts.posts)
  console.log(posts)

  function handleDeletePost(postIndex: number) {
    const newPosts = [...posts]
    newPosts.splice(postIndex, 1)
    setPosts(newPosts)
    deletePost(posts[postIndex]._id)
  }
  return (
    <div className="max-w-full sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto p-4 space-y-6">
        {posts.map((post: any, index: number) => (
          <PostCard key={index} post={post} deletePost={() => handleDeletePost(index)} />
        ))}
    </div>
  );
};