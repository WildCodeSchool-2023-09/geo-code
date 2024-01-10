import Filtre from "../components/Filtre";
import "../scss/FilterPage.scss";
import ScrollToTop from "./ResetScrollOnPage";

function FilterPage() {
  return (
    <div>
      <ScrollToTop />
      <Filtre />
    </div>
  );
}

export default FilterPage;
