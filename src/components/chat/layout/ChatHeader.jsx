import React from "react";
import {SidebarIcon, HelpIcon} from "@/assets/icons/Icons";
import styles from "../../../pages/Chat.module.css";

function Header({ toggleSidebar, isSidebarOpen }) {
  return (
    <div className={styles["chat-header"]}>
      <button
        className={`btn-ico ${isSidebarOpen ? styles["hide-btn"] : ""}`}
        onClick={toggleSidebar}
        disabled={isSidebarOpen}
      >
        <SidebarIcon color="var(--ico-color-primary)" />
      </button>

      <h1 className={styles["h-tit"]}>
        <span className="ico-logo logo-blue" />
      </h1>

      <button className="btn-ico">
          <HelpIcon color="var(--ico-color-primary)"/>
      </button>
    </div>
  );
}

export default Header;
