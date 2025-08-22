import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/login.jsx";
import SignupPage from "./components/signup.jsx";
import ProfileBox from "./components/ProfileBox.jsx";
import ViewProfile from "./components/ViewProfile.jsx";
import PrivateRoute from "./components/PrivateRoute";
import CoursesPage from "./components/CoursesPage.jsx";
import TestZone from "./components/testZone.jsx";
import CourseDetail from "./components/CourseDetail.jsx";
import TestPage from "./components/TestPage.jsx";
import RoadmapPage from "./components/RoadmapPage.jsx";
import RoadmapDetail from "./components/RoadmapDetail";
import Setting from "./components/setting.jsx"; 
import Skilicode from "./components/skilicode.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/skilicode" element={<Skilicode />} />
      <Route path="/setting" element={<Setting />} /> 
      <Route path="/test/:subject" element={<TestPage />} />
      <Route path="/course-detail/:slug" element={<CourseDetail />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/course-detail" element={<CourseDetail />} />
      <Route path="/testzone" element={<TestZone />} />
      <Route path="/profile" element={<ProfileBox name="Lakshay Yadav" />} />
      <Route path="/view-profile" element={<ViewProfile />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/roadmap/:title" element={<RoadmapDetail />} />
    </Routes>
  );
};

export default App;
