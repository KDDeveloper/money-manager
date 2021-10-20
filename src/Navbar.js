import React from "react";
import { Nav } from "react-bootstrap";
import{Link} from "react-router-dom"
import "./App.css"

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            navSlide:{transform: 'translateX(100%)'},
            burger:{background: 'rgb(22, 117, 9)'},
            burgerLines1Color:{background: 'white'},
            burgerLines2Color:{background: 'white'},
            burgerLines3Color:{background: 'white'},
            dSvg:{transform: 'rotate(-90deg)'},
            dashOptions:{display:"none"},
            navOn:false,
            dashboardOn: false
        }
    }
    

    navSlide=()=>{
        if(this.state.navOn===false){
            this.setState({navSlide:{transform: 'translateX(0%)'}});
            this.setState({burgerLines1Color:{backgroundColor:'rgb(22, 117, 9)',transform:'rotate(-45deg) translate(-5px, 6px)'}})
            this.setState({burgerLines2Color:{opacity:"0"}})
            this.setState({burgerLines3Color:{backgroundColor:'rgb(22, 117, 9)', transform:'rotate(45deg) translate(-5px, -7px)'}})
            this.setState({burger:{background:"white"}})           
        }
        if(this.state.navOn===true){
            this.setState({navSlide:{transform: 'translateX(100%)'}})
            this.setState({burgerLines1Color:{background: 'white'}})
            this.setState({burgerLines2Color:{background: 'white'}})
            this.setState({burgerLines3Color:{background: 'white'}})
            this.setState({burger:{background: 'rgb(22, 117, 9)'}})
        }
        this.setState({navOn:!this.state.navOn})
    }

    dashboardOptions = ()=>{
        if(this.state.dashboardOn===false){
        this.setState ({dSvg:{transform: 'rotate(90deg)'}})
        this.setState({dashOptions:{display:'block'}})
        }     
        if(this.state.dashboardOn===true){
        this.setState ({dSvg:{transform: 'rotate(-90deg)'}})
        this.setState({dashOptions:{display:'none'}})
        }
        this.setState({dashboardOn:!this.state.dashboardOn})
        
    }

    render(){
        return(
            <>
            <div className="navbar">
                <div className="logo">
                    <p>money manager</p>
                </div>
            </div>
            <div className="burger" style={this.state.burger} onClick={this.navSlide}>
                <div className="line1" style={this.state.burgerLines1Color}></div>
                <div className="line2" style={this.state.burgerLines2Color}></div>
                <div className="line3" style={this.state.burgerLines3Color}></div>
            </div>
            <div className="nav-options" style={this.state.navSlide}>
                <div className="navLinks">
                <Link to="/home" style={{textDecoration: 'none',color:'white'}}><p>Home</p></Link>
                <p onClick={this.dashboardOptions}>Dashboard<svg style={this.state.dSvg} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></p>
                <div className="dash-options" style={this.state.dashOptions}>
                <Link to="/weekly" style={{textDecoration: 'none',color:'white'}}><p>Weekly</p></Link>
                <Link to="/monthly" style={{textDecoration: 'none',color:'white'}}><p>Monthly</p></Link>
                <Link to="/yearly" style={{textDecoration: 'none',color:'white'}}><p>Yearly</p></Link>
                </div>
                <Link to="/" style={{textDecoration: 'none',color:'white'}}><p>Summary</p></Link>
                </div>
            </div>
            </>
        )
    }
}

export default Navbar