import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{ padding: "10px", backgroundColor: "#f4f4f4" }}>
            <Link to="/" style={{ marginRight: "10px" }}>
                Home
            </Link>
            <Link to="/create">Create Post</Link>
        </nav>
    );
};

export default Navbar;
