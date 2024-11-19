import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

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

        const fetchComments = async () => {
            const { data, error } = await supabase
                .from("comments")
                .select("*")
                .eq("post_id", id)
                .order("created_at", { ascending: false });

            if (error) console.error(error);
            else setComments(data);
        };

        fetchPost();
        fetchComments();
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

    const handleAddComment = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase
            .from("comments")
            .insert([{ post_id: id, content: newComment }]);

        if (error) {
            console.error(error);
        } else {
            setComments([data[0], ...comments]);
            setNewComment("");
        }
    };

    const handleDeleteComment = async (commentId) => {
        const { error } = await supabase
            .from("comments")
            .delete()
            .eq("id", commentId);

        if (!error) {
            setComments(comments.filter((comment) => comment.id !== commentId));
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <div className="post-detail-container">
                <h1>{post.title}</h1>
                {post.image_url && (
                    <img src={post.image_url} alt={post.title} />
                )}
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
            <div className="comments-section">
                <h2>Comments</h2>
                <form onSubmit={handleAddComment}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        required
                    />
                    <button type="submit">Add Comment</button>
                </form>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p>{comment.content}</p>
                            <button
                                onClick={() => handleDeleteComment(comment.id)}>
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
};

export default PostDetails;
