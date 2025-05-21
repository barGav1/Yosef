import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from "./pages/Default";
import Upload from "./pages/Upload";
import LinksList from "./pages/LinksList";
import NewTest from "./pages/NewTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/NewTest" element={<NewTest />} />
        <Route path="/class/:classId/subject/:subjectId/info/:infoId" element={<LinksList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;