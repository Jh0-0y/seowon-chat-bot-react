import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "@/modules/chat/slices/chatSlice";

export const useChat = () => {
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);

  // Redux 상태에서 메시지 목록 가져오기
  const chatList = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);

  // 메시지 전송 함수
  const handleSendMessage = (message) => {
    if (!message.trim()) return;
    dispatch(sendMessage(message));
  };

  // 새로운 메시지가 생길 때 스크롤 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatList]);

  return {
    chatList,
    loading,
    error,
    handleSendMessage,
    chatEndRef,
  };
};

export const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
