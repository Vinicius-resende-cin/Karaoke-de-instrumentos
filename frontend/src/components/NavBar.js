import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";
import HomeButton from "./Buttons/HomeButton";
import PlaylistButton from "./Buttons/PlaylistButton";
import ProfileButton from "./Buttons/ProfileButton";
import OptionsButton from "./Buttons/OptionsButton";
import "../styles/NavBar.css";

export default function NavBar() {
  const curPage = useContext(PageContext);
  return (
    <nav>
      <div id="links">
        <HomeButton selected={curPage === "/home"}></HomeButton>
        <PlaylistButton selected={curPage === "/playlist"}></PlaylistButton>
        <ProfileButton selected={curPage === "/profile"}></ProfileButton>
        <OptionsButton selected={curPage === "/options"}></OptionsButton>
      </div>
    </nav>
  );
}
