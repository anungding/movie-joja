import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { APIKEY, BASEURL } from "./constants/constant";

const Movie: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("action");

  interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASEURL}?s=${searchTerm}&apikey=${APIKEY}`
        );
        if (response.ok) {
          const data = await response.json();
          const fetchedMovies: Movie[] = data.Search || [];
          setMovies(fetchedMovies);
        } else {
          console.error("Gagal mengambil data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    searchTerm;
  };

  const handleDefaultSearch = () => {
    setSearchTerm("action");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:border-blue-500 flex-grow w-40"
        />
        <button
          onClick={searchTerm ? handleSearchSubmit : handleDefaultSearch}
          className="bg-red-500 text-white rounded-r-md px-4 py-2 hover:bg-red-600"
        >
          {searchTerm ? "Search" : "Refresh"}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">List Movie:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="bg-white p-2 rounded-md shadow-md">
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                src={movie.Poster}
                alt={`${movie.Title} Poster`}
                className="mb-2 rounded-md w-full h-60 object-cover"
              />
              <h3 className="text-lg font-semibold mb-2">{`${movie.Title} (${movie.Year})`}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movie;
