import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "./axios"; //the js file we created to link baseUrl to fetchUrl
// import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";
import { Link, useHistory } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/"; //baseUrl to get img

function Row({ title, fetchUrl, isLargeRow, isTv }) {
  const history = useHistory();

  const [movies, setMovies] = useState([]);
  let catlink = "movie" ; 

  if(isTv === true ) catlink = "tv"

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl); //this axios is our baseUrl
      // console.log(response.data.results) ;
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]); //empty[] array means it loads only once in the beggining when the page loads.

  // console.log(movies);

  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      {/* the poster container */}
      <div className="row-posters">
        {movies.map(movie => {
          //editing size using the isLargeRow prop for the first row to make it slightly bigger and
          //first row having poster img and second row having backdrop img
          //for first row we are adding another class to make it bigger
          return (
            <img
              key={movie?.id}
              // onClick={() => handleClick(movie)}
              onClick={() =>
                history.push(
                  `${catlink}/${movie?.id}`
                )
              }
              src={`${base_url}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}   
              className={`row-poster ${isLargeRow && "row-poster-large"}`}
              alt={movie?.name}
            />
          );
        })}
      </div>
      {/* {videoUrl && <YouTube videoId={videoUrl} opts={opts} />} */}
    </div>
  );
}

export default Row;
