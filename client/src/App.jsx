import { useEffect, useState } from "react";

const API_URL = "https://mini-mern-app.onrender.com";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  // fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes`);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  // add new note
  const addNote = async () => {
    if (!text.trim()) return;

    try {
      await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });

      setText("");
      fetchNotes();
    } catch (err) {
      console.error("Error adding note", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Mini MERN Notes App</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write note"
      />

      <button onClick={addNote}>Add</button>

      <ul>
        {notes.map((n) => (
          <li key={n._id}>{n.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
