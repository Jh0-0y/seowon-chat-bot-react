import { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, addUserMessage } from "@/modules/chat/slices/chatSlice";

// 채팅 기능을 관리하는 커스텀 훅
export const useChat = () => {
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);

  const selectedRoomId = useSelector((state) => state.chat.selectedRoomId);
  const allMessages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);

  // ✅ chatList를 useMemo로 감싸서 참조 유지
  const chatList = useMemo(() => {
    return selectedRoomId ? allMessages[selectedRoomId] || [] : [];
  }, [allMessages, selectedRoomId]);

  const handleSendMessage = (message) => {
    if (!message.trim() || !selectedRoomId) return;
    dispatch(addUserMessage(message));
    dispatch(sendMessage(message));
  };

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

// 모바일 화면 여부를 감지하는 커스텀 훅
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