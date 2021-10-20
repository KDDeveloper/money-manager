import React from "react";
import { Nav } from "react-bootstrap";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Navbar from "./Navbar";
import Summary from "./summary";
import Home from "./Home";
import Yearly from "./Yearly";
import Monthly from "./Monthly";
import Weekly from "./Weekly";
import AddEntry from "./Add";
function App() {
  return (
    <>
    <Router>
      
        <Navbar/>
        <Switch>
        <Route exact path="/" component={Summary}/>
        <Route path="/home" component={Home}/>
        <Route path="/yearly" component={Yearly}/>
        <Route path="/monthly" component={Monthly}/>
        <Route path="/weekly" component={Weekly}/>
        <Route path="/add" component={AddEntry}/>
      </Switch>
    </Router>
    </>
  );
}

export default App;
