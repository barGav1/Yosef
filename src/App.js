import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import Default from "./pages/Default.js";
import Register from "./pages/Register.js";
import ResumeMaker from "./pages/ResumeMaker.js";
import ForgotPass from "./pages/ForgotPass.js";
import ResumeViewer from "./pages/ResumeViewer.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/Register" exact element={<Register />} />
        <Route path="/ResumeMaker" exact element={<ResumeMaker />} />
        <Route path="/ResumeMaker/:resumeNumber" element={<ResumeMaker />} />
        <Route path="/ResumeViewer" exact element={<ResumeViewer />} />
        <Route path="/ForgotPass" exact element={<ForgotPass />} />
      </Routes>
    </Router>
  );
}

export default App;
