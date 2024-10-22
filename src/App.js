import { useState } from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photos/Photo";
function App() {
  const [loading , setLoading] = useState(true);
  const [photos , setPhotos] =  useState([]);
  const [page , setPage] = useState(1);
  const [query , setQuery] = useState("");
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
      <section className="photos">
        <div className="photos center">
          {
            photos.map((photo , index) => {
              <Photo {...photo} key={index}/>
            })
          }
        </div>
      </section>
    </main>
  );
}

export default App;
