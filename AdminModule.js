import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminModule = () => {
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [pdfList, setPdfList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPdfs = JSON.parse(localStorage.getItem("pdfData")) || [];
    setPdfList(Array.isArray(storedPdfs) ? storedPdfs : []);
  }, []);

  const handleCheckTopic = () => {
    if (!topic.trim()) {
      setMessage("⚠️ Please enter a topic.");
      return;
    }
    
    console.log("Stored PDFs:", pdfList);
    const exists = pdfList.some((pdf) => pdf?.topic?.toLowerCase() === topic.toLowerCase());
    
    if (exists) {
      setMessage(`✅ You already have knowledge on '${topic}'.`);
    } else {
      setMessage(`❌ No relevant PDFs found for '${topic}'. Please upload one.`);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setMessage("⚠️ Please select a file to upload.");
      return;
    }
    if (!topic.trim()) {
      setMessage("⚠️ Please enter a topic before uploading.");
      return;
    }
    
    const newPdf = { topic, name: file.name };
    const updatedPdfs = [...pdfList, newPdf];
    localStorage.setItem("pdfData", JSON.stringify(updatedPdfs));
    setPdfList(updatedPdfs);
    setMessage(`📄 PDF '${file.name}' uploaded successfully under topic '${topic}'.`);
    setFile(null);
  };

  const handleStartLearning = () => {
    navigate("/learn", { state: { topic } });
  };

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      background: "#e3f2fd" 
    }}>
      <div style={{ 
        padding: "20px", 
        maxWidth: "500px", 
        textAlign: "center", 
        fontFamily: "Arial, sans-serif", 
        background: "#f4f4f9", 
        borderRadius: "10px", 
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        paddingBottom: "30px"
      }}>
        <h2 style={{ color: "#333", marginBottom: "20px" }}>📚 Learning Assistant</h2>
        <input
          type="text"
          placeholder="Enter topic to learn..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ 
            width: "80%", 
            padding: "10px", 
            marginBottom: "10px", 
            borderRadius: "5px", 
            border: "1px solid #ccc", 
            textAlign: "center"
          }}
        />
        <br />
        <button 
          onClick={handleCheckTopic} 
          style={{ 
            padding: "10px 20px", 
            background: "#007bff", 
            color: "#fff", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
            margin: "10px 0", 
            fontSize: "16px"
          }}>
          🔍 Check
        </button>
        <br />
        {message && <p style={{ fontSize: "16px", color: "#333" }}>{message}</p>}
        
        {message.includes("You already have knowledge on") && (
          <button 
            onClick={handleStartLearning}
            style={{ 
              padding: "10px 20px", 
              background: "#ff9800", 
              color: "#fff", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer", 
              fontSize: "16px", 
              marginTop: "10px" 
            }}>
            📖 Start Learning Now
          </button>
        )}
        
        {message.includes("No relevant PDFs found") && (
          <div>
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handleFileChange} 
              style={{ margin: "10px 0" }}
            />
            <br />
            <button 
              onClick={handleUpload} 
              style={{ 
                padding: "10px 20px", 
                background: "#28a745", 
                color: "#fff", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer", 
                fontSize: "16px"
              }}>
              ⬆️ Upload PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminModule;
