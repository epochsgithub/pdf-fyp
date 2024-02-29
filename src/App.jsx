import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/scss/core.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import PDFReader from "./PDFReader";
import UserProfile from "./UserProfile";
import Dashboard from "./Dashboard";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import PDFTable from "./PDFTable";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!window.location.pathname.includes("/app")) {
      window.location.assign("/app")
    }
  }, [])
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/doc" element={<PDFReader />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/table" element={<PDFTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
