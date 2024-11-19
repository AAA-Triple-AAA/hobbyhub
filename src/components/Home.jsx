import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../supabaseClient";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [orderBy, setOrderBy] = useState("created_at");

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order(orderBy, { ascending: false });

            if (error) console.error(error);
            else setPosts(data);
        };
        fetchPosts();
    }, [orderBy]);

    return (
        <div>
            <h1>The Bird Network</h1>
            <div className="order-button-container">
                <button onClick={() => setOrderBy("created_at")}>
                    Sort by Time
                </button>
                <button onClick={() => setOrderBy("upvotes")}>
                    Sort by Upvotes
                </button>
            </div>
            <ul>
                {posts.map((post) => (
                    <li
                        key={post.id}
                        style={{ border: "1px solid #ccc", margin: "10px" }}>
                        <h3>{post.title}</h3>
                        <p>Upvotes: {post.upvotes}</p>
                        <p>
                            Created At (UTC):{" "}
                            {new Date(post.created_at).toLocaleString()}
                        </p>
                        <Link to={`/post/${post.id}`}>View Post</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
