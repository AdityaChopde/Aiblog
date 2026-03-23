import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const registerUser = async () => {

        if (!name || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        try {

            setLoading(true);
            setError("");

            await axios.post(
                "http://localhost:5000/api/auth/register",
                { name, email, password }
            );

            alert("Registration Successful");

            navigate("/");

        } catch (err) {

            setError("Registration Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">

            <div className="bg-white p-8 rounded-xl shadow-lg w-96">

                <h2 className="text-3xl font-bold text-center mb-2">
                    Create Account 🚀
                </h2>

                <p className="text-gray-500 text-center mb-6">
                    Register to start using the platform
                </p>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-3">
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={registerUser}
                    className="w-full bg-purple-500 text-white p-3 rounded-lg hover:bg-purple-600 transition duration-200"
                >
                    {loading ? "Creating Account..." : "Register"}
                </button>

                <p className="text-center text-gray-500 mt-4">

                    Already have an account?{" "}

                    <Link
                        to="/"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;