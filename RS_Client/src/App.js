import { Route, Routes } from "react-router";
import { useEffect } from "react";
import Login from "./Components/Auth/login";
import Register from "./Components/Auth/register";
import Navbar from "./Components/Navbar/navbar";
import Tracker from "./Components/Tracker/tracker";
import { useSelector } from "react-redux";
import Project from "./Components/Projects/project";
import Teams from "./Components/Teams/teams";
import { useGetUser } from "./Components/getUser";
import Client from "./Components/Clients/clients.jsx";
import SpecificProject from "./Components/Projects/specificProject";
import UserRegister from "./Components/Auth/asUserRegister";
// import Error404 from "./Components/Error/error";
import Dashboard from "./Components/Dashboard/dashboard";
// import { useState } from "react";
function App() {
  const { fetchuser } = useGetUser();

  useEffect(() => {
    fetchuser();
  }, []);

  const user = useSelector((state) => state.user.user);
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="register/user/:email" element={<UserRegister />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {user && (
          <>
            <Route path="client" element={<Client />} />
            <Route exact index path="tracker" element={<Tracker />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="teams" element={<Teams />} />
            <Route path="projects" element={<Project />} />
            <Route path="projects/:id" element={<SpecificProject />} />
          </>
        )}
      </Route>
      <Route path="/register" element={<Register />} />
      {/* <Route path="*" element={<Error404 />} /> */}
    </Routes>
  );
}

export default App;
