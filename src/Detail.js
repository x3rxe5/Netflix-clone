import React, { useState, useEffect } from "react";
import axios from "./axios";
import './MovieDetail.css'
import Nav from "./Nav";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url_img = "https://image.tmdb.org/t/p/original/"; //baseUrl to get img

function Detail({ match }) {
  const [item, setItem] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

  
   useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        `/search/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&query=${match.params.Title}`
      );

      console.log(match);
      console.log(response.data.results[0]);

//***LOOOOOOOOOOOOOOOOOOOOK HERE*********
//********//if its not a tv series then change the baseUrl to search in movie category 
      if(response.data.results[0] == null){ response = await axios.get(
        `/search/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&query=${match.params.Title}`
        );
        console.log(response.data.results[0]);
      }
      setItem(response.data.results[0]);

      return response;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  // for youtube video
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };

  const handleClick = item => {
      movieTrailer(item?.title || item?.name || item?.original_title || "")
        .then(url => {
          

          //eg link  https://www.youtube.com/watch?v=8x947pqWayM&t=4833s
          const urlParams = new URLSearchParams(new URL(url).search); //this will give the content after '?'
          setVideoUrl(urlParams.get("v"));
        })
        
        .catch(error => console.log(error));
  };
  handleClick(item);

  return (
    <header>   
    <Nav />
  
      <div className="MovieDetail" style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          "${base_url_img}${item?.backdrop_path}"
        )`,
        backgroundPosition: "center center"
      }}>
        <div className="MovieDetail-content">
            <h1 className="MovieDetail-title">
              {item?.title || item?.name || item?.original_name} </h1>

              <h3 className="MovieDetail-date">{item?.first_air_date || item?.release_date} | 18+   </h3>
              <h3>Average vote : {item?.vote_average || "No data found"} / 10 </h3>
              <h3>Vote count : {item?.vote_count || "No data found" }</h3>
              <h2 className="MovieDetail-desc">Overview : {truncate(item?.overview, 550) || "No data found"}</h2>
              
            </div>

          {/* to add the fade bottom effect */}
        <div className="MovieDetail-fade"></div>

      </div>
      {videoUrl && 
          <div className="MovieDetail-video-container">
          <div className="MovieDetail-video">
              <h1>Trailer</h1>
              <YouTube videoId={videoUrl} opts={opts} />
          </div>
          </div>

       }
   </header>
  );
}

export default Detail;
