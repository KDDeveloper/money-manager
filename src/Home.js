import React from "react";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import "./App.css";
import AddEntry from "./Add";
import axios from "axios";
import { makeStyles} from "@material-ui/core/styles";
import {Grid,Card,CardActions,CardContent,Typography,IconButton} from "@material-ui/core";
import {Create as CreateIcon} from "@material-ui/icons"
import {Delete as DeleteIcon} from "@material-ui/icons"

const style = makeStyles(theme=>({
    root:{
        flexGrow:1
    }
}))
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            entries:[]
        }
    }

    getRecentEntries = async () => {
        let {data} = await axios.get('http://localhost:3001/entries');
        this.setState({entries:data});
        console.log(this.state.entries);
    }
    componentDidMount(){
       this.getRecentEntries()
    }

    render(){
        return(
            <>  
                <div className="home">
                   <Link to="/add/:id/:upDay/:upMonth/:upYear/:upDivision/:upCategory/:upType/:upAmount" style={{textDecoration:'none'}}><h1>+ Click here to add </h1></Link>
                </div>
                <Grid container spacing={1} style={{display:"flex",justifyContent:"space-around",margin:"0 auto", width:"80%"}}>
                    {this.state.entries.map((row)=>{
                       return( <Grid key={row._id}>
                            <Card style={{minWidth:200, boxShadow:6, display:"flex",flexDirection:"column"}}>
                                <CardContent>
                                    <Typography variant="h6" component="h2" style={{marginBottom:8,color:'rgb(22, 117, 9)'}} >
                                        {row.category}
                                    </Typography>
                                    <Typography style={{marginBottom:3}}>
                                        Date: {row.day}/{row.month}/{row.year}
                                    </Typography>
                                    <Typography style={{marginBottom:3}}>
                                        Division: {row.division}
                                    </Typography>
                                    <Typography style={{marginBottom:3}}>
                                        Type: {row.type}
                                    </Typography>
                                    <Typography style={{marginBottom:3}}>
                                        Amount: Rs.{row.amount}
                                    </Typography>
                                    </CardContent>
                                    <CardActions style={{display:"flex", justifyContent:"space-around"}}>
                                        <Link to={`/add/${row._id}/${row.day}/${row.month}/${row.year}/${row.division}/${row.category}/${row.type}/${row.amount}`} style={{textDecoration:'none'}}><IconButton
                                        size="small"
                                        edge="start"
                                        style={{color:"black"}}
                                        aria-label="update"
                                        >
                                            <CreateIcon className="update-button"/>
                                        </IconButton></Link>
                                        <Link to={`/delete/${row._id}`} style={{textDecoration:'none'}}><IconButton
                                        size="small"
                                        edge="start"
                                        style={{color:"black"}}
                                        aria-label="delete"
                                        >
                                        <DeleteIcon className="delete-button"/>
                                        </IconButton></Link>
                                    </CardActions>
                            </Card>
                        </Grid>
                     )
                      })}
                </Grid>
            
            </>
        )
    }
}

export default Home