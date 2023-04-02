import { Routes, Route, useNavigate } from "react-router-dom";
import HomeComp from "./components/home";
import UserComp from "./components/user";


export default function App() {

  return (
    <div>
      <Routes>
        <Route path='/users/:name' element={<UserComp></UserComp>}></Route>
        <Route path='/' element={<HomeComp></HomeComp>}></Route>
      </Routes>
    </div>
  );
}