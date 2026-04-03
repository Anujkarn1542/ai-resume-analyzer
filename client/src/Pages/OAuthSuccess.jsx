import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");

    console.log("FULL URL:", window.location.href);
    console.log("TOKEN:", token);
    console.log("NAME:", name);

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("name", name || "User");

      console.log("Stored token:", localStorage.getItem("token"));

      // small delay to ensure localStorage is written
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 200);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      Signing you in...
    </div>
  );
}
