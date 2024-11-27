import React from "react";
import { auth } from "../../services/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const GoogleLogin: React.FC = () => {
  const navigate = useNavigate(); 

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Usuario autenticado:", result.user);
      navigate("/comics"); 
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img
          src="https://i.pinimg.com/736x/e9/72/42/e972422a797d7bb40f207137729bd862.jpg"
          alt="Login Background"
          className="login-image"
        />
        <h2 className="login-title">Conéctate y explora tus cómics favoritos.</h2>
        <button className="login-with-google-btn" onClick={handleGoogleLogin}>
          Iniciar Sesión con Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
