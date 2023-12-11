<<<<<<< HEAD
import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from "./DraggableMarker";
import LocationMarker from "./LocationMarker";
import BornesMarker from "./BornesMarker";
import "./App.css";

function App() {
  return (
    <MapContainer
      center={{ lat: 48.852969, lng: 2.349903 }}
      zoom={20}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker center={{ lat: 48.852969, lng: 2.349903 }} />
      <LocationMarker />
      <BornesMarker />
    </MapContainer>
=======
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
>>>>>>> d8cfb585c37177ae2bae629140af19411de68faf
  );
}

export default App;
