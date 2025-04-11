import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AddNote.css";

const AddNote = () => {
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://unfilteredbackend-dfeg.onrender.com/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, note, color }),
    });
    

    if (response.ok) {
      setMessage("🎉 Note added successfully!");
      setMessageColor("#d4f5c7");
      setName("");
      setNote("");

    
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } else {
      setMessage("🚫 Failed to add note. Try again!");
      setMessageColor("#ffb3b3"); 
    }
  };

  return (
    <div className="page-container">
      <header className="navbar">
     <Link to="/" className="logo" style={{ textDecoration: "none", color: "inherit", fontWeight: "bold", fontSize: "1.5rem" }}>
  💌 Unfiltered
</Link>

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
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

      <main className="add-hero">
        <div className="hero-left">
          <img
            src="https://media.giphy.com/media/QsCGFiQ1GqA71BfZ29/giphy.gif?cid=ecf05e47fnwyngplvkvoa527puhih4s0uegm8dnfn3thuiku&ep=v1_stickers_related&rid=giphy.gif&ct=s"
            alt="hero gif"
          />
          <h1>Drop a Whisper of Kindness 💌 (Anonymously!)</h1>
        </div>

        <form onSubmit={handleSubmit} className="note-form">
          <label>😎 To:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Who’s this note for?"
          />

          <label>✍️ Your Note:</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={1000}
            rows={8}
            placeholder="Say what you feel..."
            required
          />
          <p className="char-counter">{note.length} / 1000</p>

          <label>🎨 Choose a Color:</label>
          <div className="color-picker">
            {[
              "#ffb6c1", "#f9d8b7", "#98c7f5", "#f5d1ff",
              "#b1ffdd", "#f4c6ff", "#c0d9f4", "#ffdab9", "#c5e3ff"
            ].map((col, index) => (
              <div
                key={index}
                className={`color-circle ${color === col ? "selected" : ""}`}
                style={{ backgroundColor: col }}
                onClick={() => setColor(col)}
              />
            ))}
          </div>

          <button type="submit" className="submit-btn">🚀 Submit Note</button>

          {message && (
            <div
              className="feedback-message"
              style={{
                backgroundColor: messageColor,
                marginTop: "1rem",
                padding: "1rem",
                borderRadius: "10px",
                textAlign: "center",
                fontWeight: "bold",
                animation: "fadeIn 0.3s ease-in",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </main>

      <footer className="footer">
         <Link to="/" className="footer-col"><h3>💌 Unfiltered</h3></Link>
        <div className="footer-col"><p>A safe place to express thoughts anonymously.</p></div>
        <div className="footer-col">
          <Link to="/">Home</Link>
          <Link to="/add-note">Add Note</Link>
          <Link to="/about">About</Link>
        </div>
      </footer>
    </div>
  );
};

export default AddNote;
