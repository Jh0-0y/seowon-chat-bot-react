import ChatBubble from "../ui/ChatBubble";
import styles from "./ChatContents.module.css";

const ChatContents = ({ chatList, chatEndRef }) => {
  return (
    <div className={styles["chat-container"]}>
      <div className={styles["chat-inner"]}>
        <div className={`${styles["chat-content"]} u-w-70`}>
          {chatList.map((msg) => (
            <ChatBubble
              key={msg.id}
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