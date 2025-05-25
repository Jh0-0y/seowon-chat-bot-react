export const sendTestAjax = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("❌ 토큰 없음");
    return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "http://123.111.17.25:8080/api/chat", true);

  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      console.log("📦 응답 코드:", xhr.status);
      console.log("📨 응답 내용:", xhr.responseText);
    }
  };

  const data = JSON.stringify({ message: "AJAX 테스트입니다" });
  xhr.send(data);
};