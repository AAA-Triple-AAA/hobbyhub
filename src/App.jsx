import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostDetails />} />
                <Route path="/post/:id/edit" element={<EditPost />} />
            </Routes>
        </Router>
    );
};

export default App;
