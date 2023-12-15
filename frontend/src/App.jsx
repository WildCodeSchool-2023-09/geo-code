import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import FilterResearch from "./Context/ResearchContext";
import LocationContext from "./Context/locationContext";
import Navbar from "./components/navbar";
import NavMobile from "./components/navmobile";
import Footer from "./components/footer";
import "./scss/root.scss";
import "./scss/components/footer.scss";

import navData from "./data/NavBarData.json";

function App() {
  const [research, setResearch] = useState({
    code: "",
    enseigne: "",
    rayon: "",
    puissance: "",
    disponible: "",
    tarification: "",
    prise: "",
  });

  const value = useMemo(
    () => ({ research, setResearch }),
    [research, setResearch]
  );

  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const positionValue = useMemo(
    () => ({ position, setPosition }),
    [position, setPosition]
  );
  console.info(position);
  return (
    <>
      <Navbar navData={navData} />
      <main>
        <LocationContext.Provider value={positionValue}>
          <FilterResearch.Provider value={value}>
            <Outlet />
          </FilterResearch.Provider>
        </LocationContext.Provider>
      </main>
      <Footer />
      <NavMobile />
    </>
  );
}

export default App;
