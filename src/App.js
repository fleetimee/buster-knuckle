import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./Signin";
import Profile from "./Profile";
import DataGridd from "./DataGrid";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Signin />;
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data" element={<DataGridd />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
