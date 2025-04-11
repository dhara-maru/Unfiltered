import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./HomePage.css";
import "./About.css";

const About = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <>
      <header className="navbar">
       <Link to="/" className="logo" style={{ textDecoration: "none", color: "inherit", fontWeight: "bold", fontSize: "1.5rem" }}>
  💌 Unfiltered
</Link>
        <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </div>
        <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/add-note" className="add-btn" onClick={() => setMenuOpen(false)}>➕ Add Note</Link>
          <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
            {darkMode ? "🌤️" : "🌙"}
          </button>
        </nav>
      </header>

      <section className="about-container">
        <div className="about-left">
          <img
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGo4ZTJ5MzVrNW9yc20wNzFnMG9icWQ0eGtlZm5jMGhjYjh6Nmg1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/t7gTF8AZpC8ecrdI9v/giphy.gif"
            alt="About Gif"
            className="about-gif"
          />
          <h2 className="about-heading">About me and this app</h2>
        </div>

        <div className="about-right">
          <p>Hey! I'm <strong>Dhara Maru</strong> — an MCA student who's still learning, experimenting, and vibing with code one bug at a time.🚀</p>
          <p>I built  <i><b>Unfiltered</b></i>  just for fun, to explore, experiment, and express a little creativity. This app lets you send anonymous unsent notes to anyone — crushes, enemies, besties, whoever. You can search names and see what people left unsaid. It’s simple, cute, and lowkey poetic. 💌</p>
        </div>
      </section>

      <section className="contact-cards">
        <div className="contact-card pastel-green">
          <FaGithub size={30} className="iconsmall"/>
          <p>dhara-maru</p>
          <a href="https://github.com/dhara-maru" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>

        <div className="contact-card pastel-blue">
          <FaLinkedin size={30} className="iconsmall"/>
          <p>Dhara Maru</p>
          <a href="https://www.linkedin.com/in/dhara-maru/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </section>

      <footer className="footer">
        <Link to="/" style={{ textDecoration: "none", color: "black !important" }} className="footer-col"><h3>💌 Unfiltered</h3></Link>
        <div className="footer-col"><p>A safe place to express thoughts anonymously.</p></div>
        <div className="footer-col">
          <Link to="/">Home</Link>
          <Link to="/add-note">Add Note</Link>
          <Link to="/about">About</Link>
        </div>
      </footer>
    </>
  );
};

export default About;
