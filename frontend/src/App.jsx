import { Outlet } from "react-router-dom";

import Navbar from "./components/navbar";
import NavMobile from "./components/navmobile";
import Footer from "./components/footer";

import "./scss/root.scss";
import "./scss/components/footer.scss";

import navData from "./data/NavBarData.json";

function App() {
  return (
    <>
      <Navbar navData={navData} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <NavMobile />
    </>
  );
}

export default App;
