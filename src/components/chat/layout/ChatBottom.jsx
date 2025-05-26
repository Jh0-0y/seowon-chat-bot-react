import { useState, useRef, useEffect } from "react";
import { SendIcon } from "@/assets/icons/Icons";
import styles from "./ChatBottom.module.css";

function Bottom({ onSend, loading}) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  //textarea 높이조절
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
  };

  const handleChange = (e) => {
    setInput(e.target.value);
    resizeTextarea();
  };

  //메시지 전송 처리
  const handleSubmit = () => {
    if (!input.trim()) return; //공백만 있을 경우 무시
    onSend(input); // 상위 컴포넌트에 메시지 전달
    setInput(""); // 입력창 초기화
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; //높이 초기화
    }
  };

  //키보드 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSubmit(); // 전송 처리
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, []);

  return (
    <div className={styles["chat-bottom"]}>
      <div className={styles["inp-wrap"]}>
        <div className={styles["inp-box"]}>
          <div className={styles["inp-text-wrap"]}>
            <textarea
              ref={textareaRef}
              className={styles["inp-text"]}
              placeholder="질문을 입력하세요."
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={loading}
            />
          </div>
          <div className={styles["inp-actions-wrap"]}>
            <div className={styles["inp-funtions-wrap"]}>
              <button className={styles["icon-btn"]}>
                <span className="ico-add"></span>
              </button>
              <button className={styles["icon-btn"]}>
                <span className="ico-lang"></span>
              </button>
              <button className={styles["icon-btn"]}>
                <span className="ico-more"></span>
              </button>
            </div>
            <button className="btn-ico" onClick={handleSubmit}>
              <SendIcon color="var(--ico-color-primary)" />
            </button>
          </div>
        </div>
      </div>
      <div className={styles["inp-warning"]}>
        <p>S-Goon은 테스트 단계입니다.</p>
      </div>
    </div>
  );
}

export default Bottom;
