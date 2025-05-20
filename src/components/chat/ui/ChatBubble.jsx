import "./ChatBubble.css";

const ChatBubble = ({ type, text, spinner }) => {
  const isUser = type === "user";
  const isBot = type === "bot" || type === "loading";

  if (isUser) {
    return (
      <div className="user-wrap">
        <div className="user-bubble">
          <div className="user-chating">
            <span className="user-text">{text}</span>
          </div>
        </div>
      </div>
    );
  }

  if (isBot) {
    return (
      <div className="bot-wrap">
        <div className="bot-profile">
          <div className="ico-bot-profile">
            <span className="ico-bot-profile-img" />
          </div>
          <div className="bot-name-wrap">
            <span className="bot-name">S-Goon</span>
          </div>
        </div>
        <div className="bot-bubble">
          <div className="bot-chating">
            {spinner && (
              <img src={spinner} alt="로딩중" className="spinner" />
            )}
            <span className="bot-text">{text}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ChatBubble;
