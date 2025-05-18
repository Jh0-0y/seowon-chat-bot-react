import React, { useState } from "react";
import { useChat } from "@/modules/hooks/useChat";
import Header from "./layouts/Header";
import ChatContents from "./layouts/ChatContents";
import Bottom from "./layouts/Bottom";
import SideBar from "./layouts/SideBar";
import styles from "./Chat.module.css";
import useIsMobile from "@/modules/hooks/useIsMobile";

function ChatPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { chatList, chatEndRef, handleSend } = useChat();
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
        <div
          className={styles["sidebar-dimmed"]}
          onClick={toggleSidebar}
        />
      )}
      
      <div
        className={`${styles["chat-wrap"]} ${
          isSidebarOpen && !isMobile ? styles["shifted"] : ""
        }`}
      >
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <ChatContents chatList={chatList} chatEndRef={chatEndRef} />
        <Bottom onSend={handleSend} />
      </div>
    </div>
  );
}

export default ChatPage;
