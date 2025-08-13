import { useState } from "react"
import { useNavigate } from "react-router-dom"
import heroImage from "../assets/img/hero-renters.jpg";

export const PasswordResetEmail = () =>{
   const navigate =useNavigate(); 
   const [email, setEmail] = useState ("") 
   const [error, setError]= useState("")
   const checkEmail = async (ev) =>{
      try{
      ev.preventDefault();
      setError("");
      const resp = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
      }
    );

    const data = await resp.json();

   if (resp.ok) {
   sessionStorage.setItem("resetEmail", email);
   sessionStorage.setItem("resetToken", data.token); 
   navigate("/securityquestion"); 

    }else{
      setError(data.msg || "No user with that email");
    }} catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);}   }
   return(
      <div className="d-flex justify-content-center align-items-center"
            style={{
               backgroundImage: `url(${heroImage})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
               minHeight: "100vh",
               paddingTop: "100px",
               boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.5)", // dark overlay
            }}>
      <div className="container bg-white shadow p-4 rounded"
			style={{ maxWidth: "500px" }}> 
      <h2 className="text-center mb-4">Reset password</h2>         
      <form  onSubmit={checkEmail}>
         <div className="mb-3">
            <label className="form-label">what is your email?</label>
            <input type="email" 
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
         </div>
         {error && <div className="text-danger mb-3">{error}</div>} 
         <button type="submit">
            submit
         </button>
      </form>
      </div>  
      </div>
   )}