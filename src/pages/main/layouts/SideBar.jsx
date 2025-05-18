import React from "react";
import UserProfile from "../components/UserProfile";
import DevServerInput from "../components/DevServerInput";
import LogoutBtn from "../components/LogoutBtn";
import { SidebarIcon, SearchIcon, PlusIcon } from "@/assets/icons/Icons";
import styles from "../Chat.module.css";

function SideBar({ isOpen, toggleSidebar, isLoggedIn, user }) {
  return (
    <div
      className={`${styles["sidebar-overlay"]} ${isOpen ? styles["open"] : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles["sidebar-header"]}>
        <button type="button" className="btn-ico" onClick={toggleSidebar}>
          <SidebarIcon color="var(--ico-color-primary)" />
        </button>

        <div className={styles["sidebar-controls"]}>
          <button type="button" className="btn-ico">
            <SearchIcon color="var(--ico-color-primary)"/>
          </button>
          <button type="button" className="btn-ico">
            <PlusIcon color="var(--ico-color-primary)" />
          </button>
        </div>
      </div>

      <div className={styles["sidebar-content"]}>
        <ul className={styles["sidebar-list"]}>
          <li>
            <UserProfile
              isLoggedIn={isLoggedIn}
              user={isLoggedIn ? user : null}
            />
          </li>
          <li>
            <DevServerInput />
          </li>
          <li>
            <LogoutBtn />
          </li>
        </ul>

        <ul className={styles["sidebar-fotter"]}>
          <li>
            <span />
            <p>다크모드</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
