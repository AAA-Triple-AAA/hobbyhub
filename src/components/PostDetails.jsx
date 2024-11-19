import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .single();

            if (error) console.error(error);
            else setPost(data);
        };
        fetchPost();
    }, [id]);

    const handleUpvote = async () => {
        const { error } = await supabase
            .from("posts")
            .update({ upvotes: post.upvotes + 1 })
            .eq("id", id);

        if (!error) setPost({ ...post, upvotes: post.upvotes + 1 });
    };

    const handleDownvote = async () => {
        const { error } = await supabase
            .from("posts")
            .update({ upvotes: post.upvotes - 1 })
            .eq("id", id);

        if (!error) setPost({ ...post, upvotes: post.upvotes - 1 });
    };

    const handleDelete = async () => {
        const { error } = await supabase.from("posts").delete().eq("id", id);
        if (!error) navigate("/");
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="post-detail-container">
            <h1>{post.title}</h1>
            {post.image_url && <img src={post.image_url} alt={post.title} />}
            <p>{post.content}</p>
            <p>Upvotes: {post.upvotes}</p>
            <div>
                <button onClick={handleUpvote}>Upvote</button>
                <button onClick={handleDownvote}>Downvote</button>
                <button onClick={() => navigate(`/post/${id}/edit`)}>
                    Edit
                </button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

export default PostDetails;
