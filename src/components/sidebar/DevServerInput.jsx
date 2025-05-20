import React, { useState, useEffect } from "react";

const DevServerInput = () => {
  const [serverUrl, setServerUrl] = useState("");
  const [savedUrl, setSavedUrl] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("customBaseURL");
    if (stored) setSavedUrl(stored);
  }, []);

  const handleChange = (e) => {
    setServerUrl(e.target.value);
  };

  const handleSave = () => {
    if (!serverUrl.includes(":")) {
      alert("⚠️ host:port 형식으로 입력해주세요 (예: localhost:8000)");
      return;
    }
    localStorage.setItem("customBaseURL", serverUrl);
    alert(`✅ 서버 주소가 저장되었습니다:\n${serverUrl}`);
    setSavedUrl(serverUrl);
    setServerUrl("");
  };

  const handleReset = () => {
    localStorage.removeItem("customBaseURL");
    alert("🔁 서버 주소 설정이 초기화되었습니다.");
    setSavedUrl("");
  };

  return (
    <div
      className="dev-server-input"
      style={{ padding: "1rem", fontSize: "14px" }}
    >
      <h4 style={{ marginBottom: "0.5rem" }}>🧪 테스트 서버 설정</h4>

      <input
        type="text"
        value={serverUrl}
        onChange={handleChange}
        placeholder="localhost:8000"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />

      <button onClick={handleSave} style={{ marginRight: "0.5rem" }}>
        저장
      </button>

      <button onClick={handleReset}>초기화</button>

      {savedUrl && (
        <p style={{ marginTop: "1rem", color: "#666" }}>
          현재 설정된 서버: <strong>{savedUrl}</strong>
        </p>
      )}
    </div>
  );
};

export default DevServerInput;
