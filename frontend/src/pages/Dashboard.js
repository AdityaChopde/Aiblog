import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [topic, setTopic] = useState("");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all posts
    const fetchPosts = async () => {

        try {

            const res = await axios.get(
                "http://localhost:5000/api/posts/all"
            );

            setPosts(res.data);

        } catch (error) {

            console.log("Error fetching posts");

        }

    };

    // Load posts when page loads
    useEffect(() => {

        fetchPosts();

    }, []);

    // Create Post
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

            fetchPosts();

        } catch (error) {

            alert("Error creating post");

        } finally {

            setLoading(false);

        }

    };

    // Generate AI Content
    const generateAI = async () => {

        if (!topic) {
            alert("Enter topic for AI");
            return;
        }

        try {

            const res = await axios.post(
                "http://localhost:5000/api/ai/generate",
                { topic }
            );

            setContent(res.data.choices[0].message.content);

        } catch (error) {

            alert("AI generation failed");

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8">

            <h1 className="text-4xl font-bold text-center mb-10">
                ✨ AI Blog Dashboard
            </h1>

            {/* Create Blog Post */}

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg mb-10">

                <h2 className="text-2xl font-semibold mb-5">
                    ✍️ Create Blog Post
                </h2>

                <input
                    type="text"
                    placeholder="Blog Title"
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    rows="5"
                    placeholder="Write blog content..."
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {/* AI Generate */}

                <div className="flex gap-3 mb-4">

                    <input
                        type="text"
                        placeholder="Topic for AI"
                        className="flex-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    />

                    <button
                        onClick={generateAI}
                        className="bg-purple-500 text-white px-5 rounded-lg hover:bg-purple-600"
                    >
                        🤖 Generate
                    </button>

                </div>

                <button
                    onClick={createPost}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
                >
                    {loading ? "Creating..." : "🚀 Create Post"}
                </button>

            </div>

            {/* Show Posts */}

            <div className="max-w-4xl mx-auto">

                <h2 className="text-3xl font-bold mb-6">
                    📚 All Blog Posts
                </h2>

                {posts.length === 0 && (

                    <p className="text-gray-500">
                        No posts available
                    </p>

                )}

                {posts.map((post) => (

                    <div
                        key={post._id}
                        className="bg-white p-6 rounded-xl shadow mb-4"
                    >

                        <h3 className="text-xl font-semibold">
                            {post.title}
                        </h3>

                        <p className="text-gray-600 mt-2">
                            {post.content}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Dashboard;