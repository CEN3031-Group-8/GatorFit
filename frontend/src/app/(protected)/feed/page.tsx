import React from "react";
import SocialFeed from "@/components/feed/SocialFeed";
import { getFeed } from "@/actions";

export const metadata = {
  title: "Social - GatorFit",
  description: "See your friends' workouts!",
}

export default async function feed() {
  const feed = await getFeed()
  return (
    <main>
      <SocialFeed posts={feed} />
    </main>
  );
};
