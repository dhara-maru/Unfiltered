import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [searchName, setSearchName] = useState("");
  const [notes, setNotes] = useState([]);
  const [message, setMessage] = useState(""); // New state for feedback messages
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const searchNotes = async () => {
    if (searchName.trim() === "") {
      setNotes([]);
      setMessage("⚠️ Please enter a name to search.");
      return;
    }

    try {
      const response = await fetch(`https://unfilteredbackend-dfeg.onrender.com/api/notes/${searchName}`);
      const data = await response.json();
      setNotes(data);
      setMessage(data.length === 0 ? "😕 No notes found for this name." : "");
    } catch (error) {
      setNotes([]);
      setMessage("🚫 Something went wrong. Please try again.");
    }
  };

  const getPastelColor = (key) => {
    const pastelColors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#E1BAFF"];
    let index = [...key].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    return pastelColors[index % pastelColors.length];
  };

  return (
    <>
      <header className="navbar">
        <Link to="/" className="logo">💌 Unfiltered</Link>
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

      <section className="hero">
        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnVvd3F5bng1YjdocGpzcmUyMzZwYXM4OW11YmQyb3Y4MW51eDUzeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/ZuorNU99NFvIrh8V10/giphy.gif" alt="hero gif" />
        <h1>No filters. No names. Just raw, unspoken thoughts <br />note it down. 💌</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <button onClick={searchNotes}>🔎 Search</button>
          {message && <p className="no-result">{message}</p>}
          <br /><br />
          <Link to="/add-note" className="add-btn" onClick={() => setMenuOpen(false)}>➕ Add Note</Link>
        </div>
      </section>

      <section className="notes">
        {notes.length > 0 && (
          <div className="notes-grid">
            {notes.map((note) => (
              <div
                key={note._id}
                className="note-card"
                style={{ backgroundColor: note.color || getPastelColor(note.name) }}
              >
                <h3>👤 To: {note.name}</h3>
                <hr className="divider" />
                <p>📝 {note.note}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <div className="footer-col"><h3>💌 Unfiltered</h3></div>
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

export default HomePage;
