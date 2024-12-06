"use client"

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { searchUsers } from "@/actions/searchUsers";

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
  return (
    <div className="p-4 flex items-center border-b border-white border-opacity-10">
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
  )
}

export function SearchComponent() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(new Array<User>());

  async function handleInputChange (e: any) { 
    const search = e.target.value
    const newQuery = search;
    setQuery(newQuery)
    if(search.length <= 0) return
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



