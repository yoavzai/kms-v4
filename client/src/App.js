import { Routes, Route, useNavigate } from "react-router-dom";
import HomeComp from "./components/home";
import UserComp from "./components/user";
import Login from "./components/login";
import NewStudyComp from "./components/new_study";


export default function App() {

  return (
    <div>
      <Routes>
        <Route path='/users/:username' element={<UserComp></UserComp>}></Route>
        <Route path='/users/:username/new_study' element={<NewStudyComp></NewStudyComp>}></Route>
        <Route path='/' element={<HomeComp></HomeComp>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}