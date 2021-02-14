import React, { useState, useEffect } from "react";
import axios from "./axios";
import './MovieDetail.css'
import Nav from "./Nav";
import YouTube from "react-youtube";
// import movieTrailer from "movie-trailer";

const base_url_img = "https://image.tmdb.org/t/p/original/"; //baseUrl to get img

function Detail({ match }) {
  const [item, setItem] = useState([]);
  let videoUrl = "";

  // In match.params their is cat: tv or movie and id:eg.424892
  // In match.url eg. /tv/539753 
   useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        `${match.url}?api_key=19f84e11932abbc79e6d83f82d6d1045&append_to_response=videos,images,credits`
      );
      // let credits = await axios.get()

      // console.log("match", match);
      // console.log("movie tv Details ", response.data);
      
      setItem(response.data);

      return response.data;
    }
    fetchData();
  }, []);
  // console.log("search result movie id ",match.params.id); 


  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  // for youtube video
  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };

  function handleClick(){
      // movieTrailer(item?.title || item?.name || item?.original_title || "")
      //   .then(url => {
          
      //     //eg link  https://www.youtube.com/watch?v=8x947pqWayM&t=4833s
      //     const urlParams = new URLSearchParams(new URL(url).search); //this will give the content after '?'
      //     setVideoUrl(urlParams.get("v"));
      //   })
        
      //   .catch(error => console.log(error));

      //searching to the right trailer in the list
      if(item.videos){

        let trail = item?.videos?.results.filter( vid => {
              return ( vid?.type === "Trailer" )  ;
        }) ;

        if(trail.length > 0) videoUrl = trail[0]?.key ;
        else videoUrl = item?.videos?.results[0]?.key;
      }
  };
  handleClick();

  return (
    <header>   
    <Nav />
  
      <div className="MovieDetail" style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          "${base_url_img}${item?.backdrop_path || item?.poster_path }"
        )`,
        backgroundPosition: "center center"
      }}>
        <div className="MovieDetail-content">
            <h1 className="MovieDetail-title">
              {item?.title || item?.name || item?.original_name} </h1>

              <h3 className="MovieDetail-date">{item?.first_air_date || item?.release_date} | {item.adult && "18+"}   </h3>
              <h3>Rating : {item?.vote_average || "No data found"} </h3>
              <h3>Vote count : {item?.vote_count || "No data found" }</h3>
              <h2 className="MovieDetail-desc">Overview : {truncate(item?.overview, 420) || "No data found"}</h2>
              
            </div>

          {/* to add the fade bottom effect */}
        <div className="MovieDetail-fade"></div>

      </div>

      <div className="MovieDetail-more-details">

          <h1>Genres</h1>
          <div className="MovieDetail-genres">
                {item.genres && item.genres.map( genre=> {
                  return (<p className="genre">{genre.name}</p>)
                })}
          </div>

          <h1>Casts</h1>
          <div className="MovieDetail-casts">
                {item.credits && item.credits.cast.map( cast=> {
                  return (
                    <div>
                      <img src={`${base_url_img}${cast?.profile_path}`} className="cast" alt=""/>
                      <p className="cast-name">{cast?.name}</p>
                    </div>
                    )
                })}
          </div>


      </div>      


      {/* trailer */}
      {videoUrl && <div>
        <h1 className="trailer-title">Trailer</h1>
          <div className="MovieDetail-video-container">
          <div className="MovieDetail-video">
              <YouTube videoId={videoUrl} opts={opts} className="MovieDetail-video-vid" />
          </div>
          </div></div>

       }
   </header>
  );
}

export default Detail;
