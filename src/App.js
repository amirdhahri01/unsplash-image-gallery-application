import { useEffect, useState } from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photos/Photo";

const clientID = "?client_id=ecJci9pc_gxMPU6SnVqK1r5RX6LOVBujpf_9lJC96Ms";
const mainUrl = "https://api.unsplash.com/photos/";
const searchUrl = "https://api.unsplash.com/search/photos/";

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
    } catch (err) {
      setLoading(false);
      console.log(err.message());
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleSumbit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  };

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => oldPage + 1);
      }
    });
    return window.removeEventListener("scroll", event);
  });
  return (
    <main>
      <section className="search">
        <form action="" className="search-form">
          <input
            type="text"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSumbit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos center">
          {photos.map((photo, index) => (
            <Photo {...photo} key={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
export default App;
