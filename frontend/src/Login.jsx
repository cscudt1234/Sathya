import { useState } from "react";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const login = async (e) => {
        e.preventDefault();
        const response = await fetch(
            "http://127.0.0.1:8000/api/login/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        );
        const data = await response.json();
        if (response.ok) {
            alert("Login successful!");
            console.log(data);
        }
        else {
            alert(data.error);
        }
    };
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={login}>
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
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />
                <br /><br />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
export default Login;
