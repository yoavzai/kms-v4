import { useQuery } from "@apollo/client";
import { ALL_USERS } from "../../queries/users";
import { useState } from "react";
import { cleanPayload } from "../../utils";

export default function () {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  useQuery(ALL_USERS, { onCompleted: handleSetUsers });

  function handleSetUsers(data) {
    const payload = cleanPayload(data.userMany);
    setUsers(payload);
    const userId = window.sessionStorage.getItem("userId");
    if (userId) {
      setCurrentUserId(userId);
    } else {
      setCurrentUserId(payload[0]._id);
      window.sessionStorage.setItem("userId", payload[0]._id);
    }
  }

  function handleUserChange(e) {
    setCurrentUserId(e.target.value);
    window.sessionStorage.setItem("userId", e.target.value);
  }

  return (
    <div>
      <h1>Homepage</h1>
      {users.map((user) => {
        return (
          <div key={user._id}>
            <input
              id={user._id}
              type="checkbox"
              name={user.username}
              value={user._id}
              checked={currentUserId === user._id}
              onChange={handleUserChange}
            ></input>
            <label htmlFor={user._id}>{user.username}</label>
          </div>
        );
      })}
    </div>
  );
}
