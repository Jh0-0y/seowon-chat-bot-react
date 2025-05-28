import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, addUserMessage } from "@/modules/chat/slices/chatSlice";

// 채팅 기능을 관리하는 커스텀 훅
export const useChat = () => {
  // Redux 관련 훅
  const dispatch = useDispatch(); // 액션을 디스패치하기 위한 함수
  const chatEndRef = useRef(null); // 채팅 컨테이너의 끝부분을 참조하기 위한 ref

  // Redux 상태 구독
  const chatList = useSelector((state) => state.chat.messages); // 채팅 메시지 목록
  const loading = useSelector((state) => state.chat.loading); // 로딩 상태
  const error = useSelector((state) => state.chat.error); // 에러 상태

  // 메시지 전송 처리 함수
  const handleSendMessage = (message) => {
    if (!message.trim()) return; // 빈 메시지는 무시
    // 사용자 메시지를 즉시 UI에 표시
    dispatch(addUserMessage(message));
    // 서버에 메시지 전송
    dispatch(sendMessage(message));
  };

  // 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatList]);

  // 훅에서 사용할 수 있는 값들을 반환
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
  // 초기 화면 크기에 따라 모바일 여부 설정
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false
  );

  // 화면 크기 변경을 감지하는 이벤트 리스너
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};
