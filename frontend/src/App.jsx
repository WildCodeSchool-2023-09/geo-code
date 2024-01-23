import { Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
import FilterResearch from "./Context/ResearchContext";
import LocationContext from "./Context/locationContext";
import BornesContext from "./Context/BornesContext";
import ReservationContext from "./Context/ReservationContext";
import UserContext from "./Context/UserContext";
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
    rayon: "1085",
    puissance: "",
    disponible: "",
    prise: "",
  });

  const value = useMemo(
    () => ({ research, setResearch }),
    [research, setResearch]
  );

  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [bornes, setBornes] = useState([]);

  const positionValue = useMemo(
    () => ({ position, setPosition }),
    [position, setPosition]
  );

  const bornesValue = useMemo(
    () => ({ bornes, setBornes }),
    [bornes, setBornes]
  );
  const [reservation, setReservation] = useState("");
  const [borneId, setBorneId] = useState({ borne_id: "", borne_name: "" });
  const reservationValue = useMemo(
    () => ({ reservation, setReservation, borneId, setBorneId }),
    [reservation, setReservation, borneId, setBorneId]
  );
  const date = new Date().toISOString();
  const newDate = date.slice(0, 10);
  const [user, setUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
    anniversaire: "",
    rue: "",
    code_postal: "",
    ville: "",
    nb_vehicule: 1,
    inscription: newDate,
    derniere_maj: newDate,
    connexion: newDate,
  });
  const UserValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  function OnChangePage() {
    const resizeObserver = new ResizeObserver(() => {
      if (window.innerWidth < 721) {
        if (
          window.location.pathname === "/map" ||
          window.location.pathname === "/sign-in" ||
          window.location.pathname === "/success-auth"
        ) {
          document.documentElement.scrollTop = 0;
          document.body.classList.add("no-scroll");

          if (
            window.location.pathname === "/sign-in" ||
            window.location.pathname === "/success-auth"
          ) {
            document.querySelector("nav").style.visibility = "hidden";
            document.querySelector(".TAB").style.visibility = "hidden";
          } else {
            document.querySelector("nav").style.removeProperty("visibility");
            document.querySelector(".TAB").style.removeProperty("visibility");
          }
        } else {
          document.body.classList.remove("no-scroll");
        }
      }
    });
    resizeObserver.observe(document.body);
  }

  return (
    <>
      <Navbar navData={navData} />
      <main>
        <UserContext.Provider value={UserValue}>
          <BornesContext.Provider value={bornesValue}>
            <ReservationContext.Provider value={reservationValue}>
              <LocationContext.Provider value={positionValue}>
                <FilterResearch.Provider value={value}>
                  <Outlet onChange={OnChangePage()} />
                </FilterResearch.Provider>
              </LocationContext.Provider>
            </ReservationContext.Provider>
          </BornesContext.Provider>
        </UserContext.Provider>
      </main>
      <Footer className="FooterParams" />
      <NavMobile />
    </>
  );
}

export default App;
