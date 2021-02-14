import React,{ useEffect,useState} from 'react'
import Searchpage from './Searchpage';
import axios from './axios';
import './Searchresult.css';
import {Link} from 'react-router-dom';
// import { useHistory } from "react-router-dom";

const base_url_img = "https://image.tmdb.org/t/p/original/"; //baseUrl to get img

function Searchresult({match}) {
    // const history = useHistory();
    const [mList, setmList] = useState([]);
    const [page, setPage] = useState(1) ;
    const [tot_page, setTot_page] = useState(1) ;
    const [cat, setCat] = useState("movie");   //the category to choosse movie and tv series

    useEffect(() => { 
    //    console.log(match);
       async function fetchData() {
        let response = await axios.get(`/search/${cat}?api_key=19f84e11932abbc79e6d83f82d6d1045&query=${match.params.titlename}&page=${page}`);
         
        // console.log("using tmdb search res",response) ;
        // console.log("total page" ,tot_page)

        setTot_page(response.data.total_pages) ;
        //if no movie found by the name then don't show error
        if(response.data.results==null) return( <h1>Enter correct name</h1>);

        setmList(response.data.results);
      return response.data.results;
    }
    fetchData();
    },[match,page,cat]);

  //  console.log("this is serach input:",match.params.titlename);

    return (
        <div className="main">
          <Searchpage/>

          <div className="cat-btns">
                  <button onClick={() => { setCat("movie"); setPage(1) }}>Movies</button>
                  <button onClick={() => { setCat("tv"); setPage(1) }}>Tv series</button>  
          </div>

        <div className="mList-container"> 

          <div className="mList-items">
          
            <div className="mList">
                {mList.map(movie => {
                
                    return (
                      //movie?.id is named as Title but I am passing movie id on it. 
                    <Link to={`/${cat}/${movie?.id }`} style={{'text-decoration': "none", color:'white'}}>
                        <img    
                            key={`${movie?.id}`} 
                            src={`${base_url_img}${movie?.poster_path}` }
                            alt=""
                                />
                        <p>{movie?.title || movie?.name || movie?.original_title}</p>
                    </Link>
                   
                   );
                    
                }) }

             </div>
          </div>
        </div>  
               
             <div className="page-btns">
                  <button onClick={() => {page>1 && setPage(page - 1)}}>PREVIOUS</button>
                  <button onClick={() => {page<tot_page && setPage(page + 1)}}>NEXT</button>  
             </div>

        </div> 

    )
}

export default Searchresult
