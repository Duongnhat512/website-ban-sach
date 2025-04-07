import { useState } from "react";
import { BsChatDots, BsX } from "react-icons/bs";

const ChatSelector = () => {
  const [chatType, setChatType] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-container">
      {/* Nút mở chọn chat */}
      {!isOpen && (
        <button className="chat-button" onClick={() => setIsOpen(true)}>
          <BsChatDots size={24} />
        </button>
      )}

      {/* Hộp chọn loại chat */}
      {isOpen && !chatType && (
        <div className="chat-options">
          <button className="chat-option" onClick={() => setChatType("admin")}>
            Chat với Admin
          </button>
          <button className="chat-option" onClick={() => setChatType("ai")}>
            Chat với AI
          </button>
          <BsX className="close-icon" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default ChatSelector;
