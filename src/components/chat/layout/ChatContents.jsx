import ChatBubble from "../ui/ChatBubble";
import styles from "./ChatContents.module.css";

const ChatContents = ({ chatList, chatEndRef }) => {
  return (
    <div className={styles["chat-container"]}>
      <div className={styles["chat-inner"]}>
        <div className={`${styles["chat-content"]} u-w-70`}>
          {chatList.map((msg, index) => (
            <ChatBubble
              key={index} // index를 임시 key로 사용
              type={msg.type}
              text={msg.text}
              spinner={
                msg.type === "loading"
                  ? require("@/assets/icons/spinner.png")
                  : null
              }
            />
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatContents;