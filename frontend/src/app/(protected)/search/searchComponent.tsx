import { useState } from "react";

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

export const searchComponent = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([new User()]);

  const searchUsers = async () => {
    try {
    //   const response = await axios.get("http://localhost:5000/api/users", {
    //     params: { query },
    //   });
    //   setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  }; 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-4">User Search</h1>
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 border border-gray-300 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={searchUsers}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      <div className="w-full max-w-md bg-white shadow-md rounded p-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="border-b py-2">
              <p className="text-lg font-semibold">{user.username}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}



