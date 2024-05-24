// App.js
import React from "react";
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Chat from "./pages/chat";
import BooksList from "./pages/dashboard/bookslist";
import ViewChat from "./pages/dashboard/viewchat";
import { Dashboard, Auth } from "@/layouts"; // Assuming "@/layouts" is a valid import path in your project
import routes from "@/routes";
import { MaterialTailwindControllerProvider } from "@/context";

function App() {
  return (
    <Routes>
      {/* Routes for the first project */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />

      {/* Default route */}
      <Route path="/" element={<Home />} />

      {/* Routes for the second project */}
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/dashboard/bookslist" element={<BooksList />} />
      <Route path="/dashboard/viewchat" element={<ViewChat />} />
      <Route path="/auth/*" element={<Auth />} />

      {/* Default fallback route */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
