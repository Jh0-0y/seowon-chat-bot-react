import React, { useState, useRef, useEffect } from "react";
import { SendIcon } from "@/assets/icons/Icons";
import styles from "../../../pages/Chat.module.css";

function Bottom({ onSend }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

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

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
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
