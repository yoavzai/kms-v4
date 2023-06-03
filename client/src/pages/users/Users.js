import { useState } from "react";

import { UsersBrowser } from "./components";

export default function () {
  const [data, setData] = useState({ y: 2 });
  return (
    <>
      <h1>Users page</h1>
      <UsersBrowser />
      <div>{JSON.stringify(data, null, 2)}</div>
      <button onClick={() => setData((state) => ({ ...state, x: 1 }))}>
        do
      </button>
    </>
  );
}
