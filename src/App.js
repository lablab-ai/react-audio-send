import "./App.css";
import { useState } from "react";

const WHISPER_ENDPOINT = "https://mywhisperapi.api";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("audio_file", file);

    const data = await fetch(WHISPER_ENDPOINT, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await uploadFile(file);
    setResult(res);
    setLoading(false);
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="upload-section">
          <input type="file" accept="audio/*" onChange={handleOnChange} />
        </div>
        <button type="submit">Process Audio File</button>
      </form>
      <div className="results">
        {result && !loading ? (
          <div>
            <h3>Transcription</h3>
            <p>{result.text}</p>
            <h3>Language</h3>
            <p>{result.language}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
