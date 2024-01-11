import { useState, useEffect } from "react";
import axios from "axios";

import PropTypes from "prop-types";

export default function PastReservationCard({ borneId, date }) {
  const [borneInfo, setBorneInfo] = useState();

  const newDate = date.split("T");
  const dateArray = newDate[0].split("-");
  const dateFr = `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/borneinfo`, {
        id: borneId,
      })
      .then((res) => {
        setBorneInfo(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="reservation_card">
      <p className="nameborne">{borneInfo?.n_station}</p>
      <p className="date">{dateFr}</p>
    </div>
  );
}

PastReservationCard.propTypes = {
  borneId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
