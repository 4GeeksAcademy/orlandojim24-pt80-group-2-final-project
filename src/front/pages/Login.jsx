import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import heroImage from "../assets/img/hero-renters.jpg";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	

	const handleSubmit = async (ev) => {
		ev.preventDefault();
		

		try {
			const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ email, password })
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.msg || "Login failed");
				return;
			}

			//Store token and srcuser info
			sessionStorage.setItem("token", data.token);
			sessionStorage.setItem("user", JSON.stringify(data.user));

			//Navigate based on role
			if (data.user.is_agent) {
				navigate("/realtors-dashboard");
			} else {
				navigate("/renters-dashboard");
			}
		} catch (err) {
			setError("Something went wrong!");
			console.error(err);
		}
	};

	return (
	<div
		className="d-flex justify-content-center align-items-center"
		style={{
			backgroundImage: `url(${heroImage})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			minHeight: "100vh",
			paddingTop: "100px",
			boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.5)", // dark overlay
		}}
	>
		<div
			className="container bg-white shadow p-4 rounded"
			style={{ maxWidth: "500px" }}
		>
			<h2 className="text-center mb-4">Log In</h2>
			{error && <div className="alert alert-danger">{error}</div>}
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email
					</label>
					<input
						type="email"
						className="form-control"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="btn btn-primary w-100">
					Log In
				</button>
			</form>
			<button type="button" onClick={() => navigate("/passwordreset")} class="btn btn-outline-dark">Reset Password
			</button>
		</div>
		
	</div>
);
};
