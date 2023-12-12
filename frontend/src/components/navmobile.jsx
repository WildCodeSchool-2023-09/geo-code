import "../scss/components/mobilenav.scss";
import "../scss/root.scss";
import data from "../data/TabData.json";

export default function navmobile() {
  return (
    <div className="TAB">
      <div className="TAB__svg-transition" />
      <div className="TAB__container">
        {data.map((dataIndex) => (
          <div className="TAB__container__item" key={dataIndex.id}>
            <div className="TAB__container__item__icon">
              <img src={dataIndex.icon} alt={dataIndex.name} />
            </div>
            <div className="TAB__container__item__text">
              <p>{dataIndex.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
