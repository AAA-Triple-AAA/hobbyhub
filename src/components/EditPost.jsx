import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: "", content: "", image_url: "" });

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single();

            if (!error) setPost(data);
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from("posts")
            .update(post)
            .eq("id", id);

        if (!error) navigate(`/post/${id}`);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Post</h2>
            <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                required
            />
            <textarea
                value={post.content}
                onChange={(e) =>
                    setPost({ ...post, content: e.target.value })
                }></textarea>
            <input
                type="text"
                value={post.image_url}
                onChange={(e) =>
                    setPost({ ...post, image_url: e.target.value })
                }
            />
            <button type="submit">Save Changes</button>
        </form>
    );
};

export default EditPost;
