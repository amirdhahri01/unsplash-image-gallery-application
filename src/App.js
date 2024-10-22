import "./App.css";
import { FaSearch } from "react-icons/fa";
function App() {
  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input type="text" placeholder="search" />
          <button type="submit" className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;
