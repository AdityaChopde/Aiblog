import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const login = async () => {

        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );

            localStorage.setItem("token", res.data.token);

            navigate("/dashboard");

        } catch (err) {

            setError("Invalid email or password");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h2 className="text-3xl font-bold text-center mb-2">
                    Welcome Back 👋
                </h2>

                <p className="text-gray-500 text-center mb-6">
                    Login to your account
                </p>

                {error && (
                    <p className="text-red-500 text-sm mb-3 text-center">
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Enter Email"
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={login}
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center text-gray-500 mt-4">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;