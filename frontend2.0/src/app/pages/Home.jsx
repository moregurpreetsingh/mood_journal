import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/bg.jpg";  // import the image here

const styles = {
  globalStyles: `
    html, body, #root {
      height: 100%;
      margin: 0;
      overflow: hidden;
      font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: none;
      color: #222;
    }
    button:focus-visible {
      outline: 2px solid #005fcc;
      outline-offset: 2px;
    }
  `,
  homeBackground: (bg) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage:
      `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: -1,
    pointerEvents: "none",
  }),
  mainContainer: (visible) => ({
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 20px",
    maxWidth: 800,
    margin: "0 auto",
    textAlign: "center",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  }),
  heading: {
    fontWeight: 700,
    letterSpacing: "0.05em",
    color: "#222",
    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    marginBottom: "1.5rem",
  },
  paragraph: {
    maxWidth: 600,
    lineHeight: 1.7,
    color: "#555",
    marginBottom: "2rem",
  },
  button: {
    background: "linear-gradient(90deg, #222, #000)",
    color: "#fff",
    padding: "12px 28px",
    border: "none",
    borderRadius: 10,
    fontWeight: 600,
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    transition: "all 250ms ease-in-out",
    outlineOffset: 3,
  },
  buttonHover: {
    transform: "scale(1.05)",
    background: "linear-gradient(90deg, #111, #000)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.5)",
  },
  buttonFocus: {
    outline: "2px solid #005fcc",
    outlineOffset: 2,
  },
};

export default function Home() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonFocus, setButtonFocus] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    navigate("/login");
  };

  const headingFontSize = windowWidth <= 600 ? "2rem" : "3.5rem";
  const paragraphFontSize = windowWidth <= 600 ? "1rem" : "1.15rem";
  const paragraphMarginBottom = windowWidth <= 600 ? "1.5rem" : "2rem";
  const buttonWidth = windowWidth <= 600 ? "100%" : "auto";
  const buttonJustifyContent = windowWidth <= 600 ? "center" : "flex-start";

  return (
    <>
      <style>{styles.globalStyles}</style>

      {/* Background with imported image */}
      <div style={styles.homeBackground(bgImage)} aria-hidden="true" />

      <main
        aria-label="Homepage introduction"
        style={styles.mainContainer(visible)}
      >
        <h1
          style={{
            ...styles.heading,
            fontSize: headingFontSize,
          }}
        >
          Mood Journal
        </h1>

        <p
          style={{
            ...styles.paragraph,
            fontSize: paragraphFontSize,
            marginBottom: paragraphMarginBottom,
          }}
        >
          A web application that allows users to log their daily moods and
          activities, track their emotional trends, and gain insights over
          time. The app combines mental wellness tracking with analytical
          insights, helping users understand patterns in their moods and
          identify stressful or happy periods.
        </p>

        <button
          type="button"
          aria-label="Get Started by navigating to Login page"
          onClick={handleClick}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
          onFocus={() => setButtonFocus(true)}
          onBlur={() => setButtonFocus(false)}
          style={{
            ...styles.button,
            ...(buttonHover ? styles.buttonHover : {}),
            ...(buttonFocus ? styles.buttonFocus : {}),
            width: buttonWidth,
            justifyContent: buttonJustifyContent,
            fontSize: buttonWidth === "100%" ? "1.1rem" : "1.15rem",
          }}
        >
          Get Started <span aria-hidden="true">→</span>
        </button>
      </main>
    </>
  );
}
