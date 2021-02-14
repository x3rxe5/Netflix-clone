import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./requests";

function Banner() {
  const [bannerMovie, setBannerMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      setBannerMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );

      return response;
    }
    fetchData();
  }, []); //empty[] array means we want this to only run when the page loads

  // console.log(bannerMovie);

  //function to add '...' if desc in long
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}"
        )`,
        backgroundPosition: "center center"
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {bannerMovie?.title ||
            bannerMovie?.name ||
            bannerMovie?.original_name}
        </h1>

        <div className="banner-btns">
          <button className="banner-btn">Play</button>
          <button className="banner-btn">My List</button>
        </div>

        <h2 className="banner-desc">{truncate(bannerMovie?.overview, 150)}</h2>
      </div>

      {/* to add the fade bottom effect */}
      <div className="banner-fadebottom"></div>
    </header>
  );
}

export default Banner;
