import { useState, useRef, useEffect } from "react";
import { BsChatDots, BsSend, BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiBot } from "react-icons/bi";
import { chatWithGeminiAI } from "../../../service/GeminiService";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi có thể giúp gì?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Xử lý gửi tin nhắn
  const sendMessage = async () => {
    if (input.trim() === "") return;
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const response = await chatWithGeminiAI(input);

    // Nếu response có data, lấy ra nội dung AI trả lời
    if (response?.result) {
      setTimeout(() => {
        const botMessage = { text: response.result, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      }, 400);
    }
  };

  // Hàm render tin nhắn (hiển thị video nếu có link)

  const renderMessage = (msg) => {
    const imgRegex = /(http[s]?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp))/gi;
    const bookDetailRegex = /\/product\/(\d+)/g;

    let elements = [];
    let lastIndex = 0;

    // Xử lý ảnh trong tin nhắn
    msg.text.replace(imgRegex, (match, offset) => {
      if (lastIndex !== offset) {
        elements.push(
          <span key={`text-${offset}`}>
            {msg.text.slice(lastIndex, offset)}
          </span>
        );
      }
      elements.push(
        <img
          key={`img-${offset}`}
          src={match}
          alt="Ảnh"
          className="max-w-full"
        />
      );
      lastIndex = offset + match.length;
    });

    let remainingText = msg.text.slice(lastIndex);
    lastIndex = 0;
    let finalElements = [];

    // Xử lý đường dẫn sản phẩm
    remainingText.replace(bookDetailRegex, (match, bookId, offset) => {
      if (lastIndex !== offset) {
        finalElements.push(
          <span key={`text-${offset}`}>
            {remainingText.slice(lastIndex, offset)}
          </span>
        );
      }
      finalElements.push(
        <a
          key={`link-${offset}`}
          href={`/product/${bookId}`}
          className="text-blue-500 underline ml-1"
        >
          Chi tiết sách
        </a>
      );
      lastIndex = offset + match.length;
    });

    if (lastIndex < remainingText.length) {
      finalElements.push(
        <span key={`text-${lastIndex}`}>{remainingText.slice(lastIndex)}</span>
      );
    }

    return [...elements, ...finalElements];
  };

  return (
    <div className=" fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <BsChatDots size={24} />
        </button>
      )}

      {isOpen && (
        <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span>Chat với AI</span>
            <BsX
              size={24}
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div
            style={{ height: 400 }}
            className="p-3 h-64 overflow-y-auto space-y-2"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && <BiBot size={24} className="mr-2" />}
                <div
                  className={`px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {renderMessage(msg)}
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>

          <div className="p-3 border-t flex items-center">
            <input
              type="text"
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
              placeholder="Nhập tin nhắn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="ml-2 bg-blue-600 text-white p-2 rounded-lg"
              onClick={sendMessage}
            >
              <BsSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
