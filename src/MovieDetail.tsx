// MovieDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { APIKEY, BASEURL } from './constants/constant';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
}

const MovieDetail: React.FC = () => {
  const { imdbID } = useParams<{ imdbID: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`${BASEURL}?i=${imdbID}&apikey=${APIKEY}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        } else {
          console.error("Gagal mengambil detail film:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMovieDetail();
  }, [imdbID]);

  if (!movie) {
    return <div className="mx-auto flex justify-center p-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        to="/"
        className="text-white mb-4 inline-block bg-red-600 rounded-md p-2"
      >
        Kembali ke Daftar Movie
      </Link>
      <div className="bg-white p-8 rounded-md shadow-md">
        <div className="flex flex-col md:flex-row items-center mb-4">
          <img
            src={movie.Poster}
            alt={`${movie.Title} Poster`}
            className="mb-4 mr-4 rounded-md lg:w-64 lg:h-96 object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">{`${movie.Title} (${movie.Year})`}</h2>
            <div className="space-y-2">
              <div className="flex">
                <span className="font-semibold text-gray-600 mr-1">
                  Negara:
                </span>
                <span className="text-sm">{movie.Country}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 mr-1">Rated:</span>
                <span className="text-sm">{movie.Rated}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 mr-1">Genre:</span>
                <span className="text-sm">{movie.Genre}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 mr-1">
                  Direktur:
                </span>
                <span className="text-sm">{movie.Director}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 mr-1">
                  Penulis:
                </span>
                <span className="text-sm">{movie.Writer}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 mr-1">Aktor:</span>
                <span className="text-sm">{movie.Actors}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 mr-1">
                  Bahasa:
                </span>
                <span className="text-sm">{movie.Language}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 mr-1">
                  Durasi:
                </span>
                <span className="text-sm">{movie.Runtime}</span>
              </div>
              <div className="flex">
                <span className="font-semibold text-gray-600 mr-1">
                  Penghargaan:
                </span>
                <span className="text-sm">{movie.Awards}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-gray-700">{movie.Plot}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
