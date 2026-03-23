import { useState } from "react";
import axios from "axios";

function PostForm() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const createPost = async () => {

        if (!title || !content) {
            alert("Please fill all fields");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/posts/create",
                { title, content },
                {
                    headers: {
                        Authorization: token
                    }
                }
            );

            alert("Post Created Successfully 🎉");

            setTitle("");
            setContent("");

        } catch (error) {

            alert("Error creating post");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl shadow-lg border mb-6">

            <h3 className="text-2xl font-bold mb-6 text-gray-700">
                ✍️ Create Blog Post
            </h3>

            <input
                type="text"
                placeholder="Enter Blog Title"
                className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                rows="5"
                placeholder="Write your blog content..."
                className="w-full border border-gray-300 p-3 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button
                onClick={createPost}
                disabled={loading}
                className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 hover:scale-105 transition flex items-center justify-center"
            >

                {loading ? (
                    <span className="animate-pulse">Creating Post...</span>
                ) : (
                    "🚀 Create Post"
                )}

            </button>

        </div>

    );

}

export default PostForm;