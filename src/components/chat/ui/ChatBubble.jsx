import "./ChatBubble.css";
import spinner from "@/assets/icons/spinner.png";

const ChatBubble = ({ type, text, spinner: customSpinner }) => {
  const isUser = type === "user";
  const isBot = type === "bot";
  const isLoading = type === "loading";

  if (isUser) {
    return (
      <div className="user-wrap">
        <div className="user-bubble">
          <div className="user-chating">
            <span className="user-text">{typeof text === "object" ? text.message : text}</span>
          </div>
        </div>
      </div>
    );
  }

  if (isBot || isLoading) {
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
            {(isLoading || customSpinner) && (
              <img
                src={spinner}
                alt="로딩중"
                className="spinner"
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
            )}
            <span className="bot-text">{text?.message || text}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ChatBubble;