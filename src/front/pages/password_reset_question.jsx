import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/img/hero-renters.jpg";
import heroImage from "../assets/img/hero-renters.jpg";

export const SecurityQuestion = () => {
 const navigate = useNavigate();
 const [answer, setAnswer] = useState("");
 const [question, setQuestion] = useState("");
 const [error, setError] = useState("");
 const navigate = useNavigate();
 const [answer, setAnswer] = useState("");
 const [question, setQuestion] = useState("");
 const [error, setError] = useState("");

 const email = sessionStorage.getItem("resetEmail");
 const token = sessionStorage.getItem("resetToken") 

useEffect(() => {
    if (!email || !token) {
      setError("Missing reset credentials. Please restart the password reset process.");
      navigate("/passwordreset");
      return;
    }
useEffect(() => {
    if (!email || !token) {
      setError("Missing reset credentials. Please restart the password reset process.");
      navigate("/passwordreset");
      return;
    }

    const fetchQuestion = async () => {
      try {
        const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/security-question`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  
          },
          
        });
        const data = await resp.json();
        if (resp.ok) {
          setQuestion(data.question);
        } else {
          setError(data.msg || "Could not load security question.");
        }
      } catch (err) {
        setError("Server error loading question.");
      }
    };

    fetchQuestion();
  }, [email]);

  const submitAnswer = async (ev) => {
    ev.preventDefault(); 
    setError("");
    try { 
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization":`Bearer ${token}` },
        body: JSON.stringify({ security_answer: answer }),
      })

      const data = await resp.json();  

      if (resp.ok) {
        navigate("/newpassword"); 
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          paddingTop: "100px",
          boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.5)", // dark overlay
        }}
      > 
    <div className="container bg-white shadow p-4 rounded"
			style={{ maxWidth: "500px" }}>
    <h2 className="text-center mb-4">Reset password</h2>
    <form className="mb-3" onSubmit={submitAnswer}>
      <label className="form-label">{question || "Loading question..."}</label>
      <input
        type="text"
        className="form-control"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        required
      />
      {error && <div className="text-danger mt-2">{error}</div>}
      <button type="submit" className="btn btn-primary mt-2">
        Answer
      </button>
    </form>
    </div></div>
  );
};
