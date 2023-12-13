import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import FilterResearch from "./Context/ResearchContext";
import Navbar from "./components/navbar";
import NavMobile from "./components/navmobile";
import Footer from "./components/footer";
import "./scss/root.scss";
import "./scss/components/footer.scss";

import navData from "./data/NavBarData.json";

function App() {
  const [research, setResearch] = useState({});

  const value = useMemo(
    () => ({ research, setResearch }),
    [research, setResearch]
  );

  // const [research, setResearch] = useState({});

  // useEffect(() => {
  //   setResearch({
  //    adresse: "Paris",
  //   enseignes: "Toutes",
  //     rayon: 25,
  //     puissance: 1250,
  //  });
  // }, []);
  return (
    <>
      <Navbar navData={navData} />
      <main>
        <FilterResearch.Provider value={value}>
          <Outlet />
        </FilterResearch.Provider>
      </main>
      <Footer />
      <NavMobile />
    </>
  );
}

export default App;
