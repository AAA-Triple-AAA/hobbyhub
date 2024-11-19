import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Handle search submission
    const handleSearch = async (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors

        try {
            console.log(`Searching for post with title: ${searchTerm}`);
            const { data, error } = await supabase
                .from("posts")
                .select("id") // Fetch only the ID
                .ilike("title", `%${searchTerm}%`) // Case-insensitive partial match
                .single();

            if (error) throw error;

            if (data) {
                console.log("Post found:", data);
                navigate(`/post/${data.id}`); // Redirect to the post detail page
            } else {
                setError("No post found with that title.");
            }
        } catch (err) {
            console.error("Error during search:", err.message);
            setError("Failed to retrieve post. Please try again.");
        }
    };

    return (
        <nav style={{ padding: "10px", backgroundColor: "#f4f4f4" }}>
            <Link to="/" style={{ marginRight: "10px" }}>
                Home
            </Link>
            <form onSubmit={handleSearch} className="search-area">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                />
                <button type="submit">Search</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Link to="/create">Create Post</Link>
        </nav>
    );
};

export default Navbar;
