import { useDispatch, useSelector } from "react-redux";
import { selectRoom, addRoom, fetchChatHistory } from "@/modules/chat/slices/chatSlice";
import { chatRoomCreateApi } from "@/modules/chat/chatApi"; // 💡 API 호출 함수 추가
import UserProfile from "../ui/UserProfile";
import DevServerInput from "../ui/DevServerInput";
import LogoutBtn from "../ui/LogoutBtn";
import { SidebarIcon, SearchIcon, PlusIcon } from "@/assets/icons/Icons";
import styles from "./ChatSideBar.module.css";

function SideBar({ isOpen, toggleSidebar, isLoggedIn, user }) {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.chat.rooms);
  const selectedRoomId = useSelector((state) => state.chat.selectedRoomId);

  const handleRoomClick = (roomId) => {
    dispatch(selectRoom(roomId));
    dispatch(fetchChatHistory(roomId)); // ✅ 클릭 시 채팅 내역 요청
  };

  const handleAddRoom = async () => {
    const inputTitle = prompt("새 채팅방 이름을 입력하세요");
    if (!inputTitle?.trim()) return;

    try {
      const res = await chatRoomCreateApi(inputTitle.trim());

      const roomTitle = res.title?.trim() || "서버에서 안보냄";
      dispatch(addRoom({ id: res.id, title: roomTitle }));
    } catch (err) {
      alert("채팅방 생성에 실패했습니다.");
      console.error(err);
    }
  };

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
            <SearchIcon color="var(--ico-color-primary)" />
          </button>
          <button type="button" className="btn-ico" onClick={handleAddRoom}>
            <PlusIcon color="var(--ico-color-primary)" />
          </button>
        </div>
      </div>

      <div className={styles["sidebar-content"]}>
        <ul className={styles["sidebar-list"]}>
          <li>
            <UserProfile isLoggedIn={isLoggedIn} user={user} />
          </li>
          <li>
            <DevServerInput />
          </li>
          <li>
            <ul className={styles.roomList}>
              {rooms.map((room) => (
                <li
                  key={room.id} // ✅ 고유 key 추가
                  className={`${styles.roomItem} ${
                    selectedRoomId === room.id ? styles.active : ""
                  }`}
                  onClick={() => handleRoomClick(room.id)}
                >
                  {room.title}
                </li>
              ))}
            </ul>
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