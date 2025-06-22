import styles from "./ChatBubble.module.css";
import spinner from "@/assets/icons/spinner.png";

const ChatBubble = ({ type, text, spinner: customSpinner }) => {
  const isUser = type === "user";
  const isBot = type === "bot";
  const isLoading = type === "loading";

  if (isUser) {
    return (
      <div className={styles["user-wrap"]}>
        <div className={styles["user-bubble"]}>
          <div className={styles["user-chating"]}>
            <span className={styles["user-text"]}>
              {typeof text === "object" ? text.message : text}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isBot || isLoading) {
    return (
      <div className={styles["bot-wrap"]}>
        <div className={styles["bot-profile"]}>
          <div className={styles["ico-bot-profile"]}>
            <span className={styles["ico-bot-profile-img"]} />
          </div>
          <div className={styles["bot-name-wrap"]}>
            <span className={styles["bot-name"]}>S-Goon</span>
          </div>
        </div>
        <div className={styles["bot-bubble"]}>
          <div className={styles["bot-chating"]}>
            {(isLoading || customSpinner) && (
              <img
                src={spinner}
                alt="로딩중"
                className={styles["spinner"]}
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
            )}
            <span className={styles["bot-text"]}>{text?.message || text}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ChatBubble;