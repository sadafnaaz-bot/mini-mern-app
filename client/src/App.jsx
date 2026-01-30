import { useEffect, useState } from "react";

const API = "http://localhost:5000";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const res = await fetch(API + "/notes");
    const data = await res.json();
    setNotes(data);
  };

  const addNote = async () => {
    if (!text) return;

    await fetch(API + "/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    setText("");
    fetchNotes();
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
