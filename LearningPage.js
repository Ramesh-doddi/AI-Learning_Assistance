import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const LearningPage = () => {
  const location = useLocation();
  const topic = location.state?.topic || "Unknown Topic";

  const [question, setQuestion] = useState("");
  const [textAnswer, setTextAnswer] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const handleSubmit = async () => {
    if (!question.trim()) return;

    // Dummy API Calls (Replace with actual AI logic)
    setTextAnswer(`Answer for: The Question asked`);
    setImageUrl("https://via.placeholder.com/300"); // Replace with generated image
    setAudioUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"); // Replace with generated audio
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h2>Learning Assistant - {topic}</h2>
      
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "70%", padding: "10px", marginBottom: "10px" }}
      />
      
      <button onClick={handleSubmit} style={{ padding: "10px", marginLeft: "10px", background: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Submit
      </button>

      {textAnswer && <p style={{ marginTop: "20px" }}><strong>📖 Text Answer:</strong> {textAnswer}</p>}
      
      {imageUrl && <div><strong>🖼️ Image Answer:</strong><br /><img src={imageUrl} alt="Image Generated will be here" style={{ marginTop: "10px", width: "300px" }} /></div>}

      {audioUrl && (
        <div style={{ marginTop: "20px" }}>
          <strong>🔊 Audio Answer:</strong><br />
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
          </audio>
        </div>
      )}
    </div>
  );
};

export default LearningPage;
