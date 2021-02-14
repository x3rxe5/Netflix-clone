import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import MovieDetail from "./MovieDetail";
import Searchpage from "./Searchpage";
import Searchresult from "./Searchresult";
// import Detail from "./Detail";


function NewApp() {
  return (
    <Router>
      <div className="newApp">
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/Searchpage" exact component={Searchpage}/>
          <Route path="/Searchpage/:titlename" exact component={Searchresult}/>
          <Route path="/:catlink/:id" exact component={MovieDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default NewApp;
