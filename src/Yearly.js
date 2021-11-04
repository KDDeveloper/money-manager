import React from "react";
import axios from "axios";
import {Table,TableBody,TableCell,TableContainer,TableRow, TableHead} from "@material-ui/core";
import "./App.css"
// import mongo, { entries } from "./services/mongo";

class Yearly extends React.Component{
    constructor(props){
        super(props);
        this.state={
            year:"2021",
            entries:[],
            weeklyEntries:[],
            addYears:[],
            noEntries:"Please select the week, month and Year",
            checkWeekentries: true
        }
    }

    

    getPost= async () => {
        try{
            const {data} = await axios.get('http://localhost:3001/entries');
            this.setState({entries:data});    
            console.log(this.state.entries)        
        }
        catch(err){
            console.error("Error fetching data from server",err)
        }
        
        
        if(this.state.entries!==[]){
            console.log(this.state.entries)
            let y = []

           let  entries = this.state.entries
            for (let i = 0; i < entries.length; i++) {
                y.push(entries[i].year)
            }
                                
            let newY = y.filter((element,pos)=>{
                return y.indexOf(element)===pos;
            })

           this.setState({addYears:newY}) 
        }

    }

    getWeeklyPost= async ()=>{
        const {week,month,year}=this.state
    try{    const {data}= await axios.get(`http://localhost:3001/entries/find/${year}`);
            this.setState({weeklyEntries:data});
            console.log(this.state.weeklyEntries[0]);            
            
    } catch (err){
        console.log(err)
    }
    if(this.state.weeklyEntries[0]!==undefined){
        this.setState({checkWeekentries:false})
    }
    if(this.state.weeklyEntries[0]===undefined){
        this.setState({checkWeekentries:true})
    }
    }

    handleChange=({target:{name,value}})=>{
        this.setState({[name]:value});
        console.log(this.state.month,this.state.year)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.getWeeklyPost();
        this.setState({noEntries:"The selected criteria has no entries"})

        // console.log(this.state.weeklyEntries)
    }

    componentDidMount(){
        this.getPost()
    }

    componentWillUnmount() {
    
    }
    render(){
        return(
            <>
                <form onSubmit={this.handleSubmit} className="weekly-form">
               
               <div>
                <label>Year:</label>   
                <select name="year" onChange={this.handleChange}>
                    {this.state.addYears.map((y)=>{return(<option key={y} value={`${y}`}>{y}</option>)})}
                </select>
               </div>
               <button type="submit">submit</button>
               </form>
               <br/>
               <div className="weekly-form-line"></div>
               <br/>
               <br/>
               {
               this.state.checkWeekentries 
               
               ? <h1 style={{textAlign:"center"}}>{this.state.noEntries}</h1>:
               <TableContainer>
                   <Table>
                       <TableHead>
                           <TableRow>
                               <TableCell>Category</TableCell>
                               <TableCell>Date</TableCell>
                               <TableCell>Division</TableCell>
                               <TableCell>Type</TableCell>
                               <TableCell>Amount</TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           {this.state.weeklyEntries.map((row)=>{
                            return (
                                <TableRow key={row._id}>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.day}/{row.month}/{row.year}</TableCell>
                                    <TableCell>{row.division}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                </TableRow>
                            )
                           })}
                       </TableBody>
                   </Table>
               </TableContainer>}
            </>
        )
    }
}
export default Yearly