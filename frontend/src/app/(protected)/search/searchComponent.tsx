"use client"

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { searchUsers } from "@/actions/searchUsers";
import { Button } from "@/components/ui/button";
import { createFollow } from "@/actions/createFollow";
import { deleteFollow } from "@/actions";

class User {
  username: string
  email: string
  _id: string

  constructor() {
      this.username = "george"
      this.email = "george@gmail.com"
      this._id = "12345"
  }
}

const UserComponent = (user: any) => {
  user = user.user
  const [following, setFollowing] = useState(user.following);

  function handleFollow() {
    setFollowing(!following)
    if(!following) createFollow(user._id)
    else deleteFollow(user._id)
  }
  

  return (
    <div className="p-4 flex items-center border-b border-white border-opacity-10 justify-between">
      <div className="flex items-center">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        )}
          <p className="font-semibold">{user.username}</p>
      </div>
        {following ? <Button className="bg-white text-black focus:bg-gray-200 hover:bg-gray-200" onClick={() => handleFollow()}>Unfollow</Button> :<Button className="bg-white text-black focus:bg-gray-200 hover:bg-gray-200" onClick={() => handleFollow()}>Follow</Button>}
        
    </div>
  )
}

export function SearchComponent() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(new Array<User>());

  async function handleInputChange (e: any) { 
    const search = e.target.value
    const newQuery = search;
    setQuery(newQuery)
    if(search.length <= 0) {
      setUsers(new Array<User>())
      return
    }
    const newUsers = await searchUsers(newQuery)
    setUsers(newUsers)
  }


  return (
    <div>
      <div className="p-2">
        <Input placeholder="Search users..." className="" value={query} onChange={handleInputChange}></Input>
      </div>
        {users.map((user) => (
          <UserComponent key={user._id} user={user}/>
        ))}
    </div>
  )
}



