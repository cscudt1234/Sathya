import { useState } from "react";
function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const register = async (e) => {
        e.preventDefault();
        const response = await fetch(
            "http://127.0.0.1:8000/api/register/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            }
        );
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            setUsername("");
            setEmail("");
            setPassword("");
        }
        else {
            alert(data.error);
        }
    };
    return (
        <div>
            <h2>Create Account</h2>
            <form onSubmit={register}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />
                <br /><br />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />
                <br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <br /><br />
                <button type="submit">
                    Create Account
                </button>
            </form>
        </div>
    );
}
export default Register;
