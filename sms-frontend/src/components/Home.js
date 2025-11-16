import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"; // ✅ make sure this path is correct
import bgImage from "../assets/background.jpg";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", // ✅ full screen
        width: "100%",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🔲 Dark overlay for better text visibility */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      ></div>

      {/* 🔶 Content */}
      <div
        className="d-flex flex-column align-items-center justify-content-start text-center"
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          paddingTop: "80px", // ✅ logo near top
        }}
      >
        {/* 🟢 Logo with glow effect */}
        <img
          src={logo}
          alt="Institution Logo"
          className=" fade-in img-fluid mb-4"
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)", // ✅ bright glow
            border: "4px solid white",
             animation: "fadeIn 1.5s ease-in-out",
          }}
        />

        {/* 🏫 Institute Name */}
        <h1
          className="fade-in fw-bold"
          style={{
            color: "#fff",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          AD Institute of Technology
        </h1>
        <p
          className="lead"
          style={{
            color: "#f1f1f1",
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.8)",
          }}
        >
          Excellence in Education | Empowering Future Innovators
        </p>
      </div>
    </div>
  );
};

export default Home;
