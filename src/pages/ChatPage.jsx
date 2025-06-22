import { useState } from "react";
import { useChat } from "@/modules/chat/chatHooks";
import { useIsMobile } from "@/modules/chat/chatHooks";
import Header from "@/components/chat/layout/ChatHeader";
import ChatContents from "@/components/chat/layout/ChatContents";
import Bottom from "@/components/chat/layout/ChatBottom";
import SideBar from "@/components/chat/layout/ChatSideBar";
import styles from "./ChatPage.module.css";

function ChatPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { chatList, chatEndRef, handleSendMessage, loading} = useChat();
  const isMobile = useIsMobile();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const user = isLoggedIn
    ? {
        name: "정현영",
        profileImage: "",
      }
    : null;

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className={styles["page-wrap"]}>
      <SideBar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isLoggedIn={isLoggedIn}
        user={user}
      />

      {isMobile && isSidebarOpen && (
        <div className={styles["sidebar-dimmed"]} onClick={toggleSidebar} />
      )}

      <div
        className={`${styles["chat-wrap"]} ${
          isSidebarOpen && !isMobile ? styles["shifted"] : ""
        }`}
      >
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <ChatContents chatList={chatList} chatEndRef={chatEndRef} />
        <Bottom onSend={handleSendMessage} loading={loading} />
      </div>
    </div>
  );
}

export default ChatPage;
