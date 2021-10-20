import React from "react";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import "./App.css";
import AddEntry from "./Add";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return(
            <>  
                <div className="home">
                   <Link to="/add" style={{textDecoration:'none'}}><h1>+ Click here to add </h1></Link>
                </div>
                
            
            </>
        )
    }
}

export default Home