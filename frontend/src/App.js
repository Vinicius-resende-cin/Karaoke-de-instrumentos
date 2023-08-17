import { useContext } from "react";
import { PageContext } from "./contexts/PageContext";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import PlaylistPage from "./pages/PlaylistPage";
import ProfilePage from "./pages/ProfilePage";
import OptionsPage from "./pages/OptionsPage";
import "./App.css";
import InstrumentSelection from "./pages/test/InstrumentSelection";

function CurrentPage() {
  const pageName = useContext(PageContext);
  switch (pageName) {
    case "/home":
      return <HomePage></HomePage>;
    case "/playlist":
      return <PlaylistPage></PlaylistPage>;
    case "/profile":
      return <ProfilePage></ProfilePage>;
    case "/options":
      return <InstrumentSelection></InstrumentSelection>;
    default:
      return <HomePage></HomePage>;
  }
}

export default function App() {
  const page = window.location.pathname;

  if (
    page !== "/home" &&
    page !== "/playlist" &&
    page !== "/profile" &&
    page !== "/options"
  ) {
    window.location.assign("/home");
  }

  return (
    <PageContext.Provider value={page}>
      <NavBar></NavBar>
      <CurrentPage></CurrentPage>
    </PageContext.Provider>
  );
}
