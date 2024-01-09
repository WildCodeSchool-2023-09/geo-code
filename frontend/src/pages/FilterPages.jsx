import Filtre from "../components/Filtre";
import "../scss/FilterPage.scss";
import ScrollToTop from "./ResetScrollOnPage";

function FilterPage() {
  return (
    <main>
      <ScrollToTop />
      <Filtre />
    </main>
  );
}

export default FilterPage;
