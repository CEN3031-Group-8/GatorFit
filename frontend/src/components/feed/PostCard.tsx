"use client";

import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons"
import React, { useState } from "react"
import { createLike, deleteLike } from "@/actions";

const PostCard = ({ post }: { post: any}) => {
  const [liked, setLiked] = useState(post.liked)
  const [likeCount, setLikeCount] = useState(post.numLikes)

  const handleLike = () => {
    if (!liked) createLike(post._id)
    else deleteLike(post._id)
    setLiked(!liked)
    setLikeCount((prev: number) => (liked ? prev - 1 : prev + 1))
  };

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
      <div className="flex items-center mb-4">
        {post.profilePicture ? (
          <img
            src={post.creator.profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        )}
        <span className="font-semibold">{post.creator.username}</span> 
      </div>

      <p className="mb-4 whitespace-pre-line">
        {post.message + "\n"}
        {workoutText}
      </p>

      <div className="flex items-center space-x-6 mb-4">
        <button
          onClick={handleLike}
          className="flex items-center space-x-2 p-2"
          aria-label="Like"
        >
          <span>{liked ? <HeartFilledIcon/> : <HeartIcon/> }</span>
          <span>{likeCount}</span>
        </button>

        
      </div>
    </div>
  );
};

export default PostCard;