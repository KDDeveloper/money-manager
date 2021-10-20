import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./App.css";
// const mongo = require("./services/mongo");
// async()=>{await mongo.connect()}
class AddEntry extends React.Component{
    constructor(props){
        super(props);
        this.state={
                date: new Date(),
                day:"",
                month:"",
                year:'',
            category:"",
            posts:[],
            amount:"",
            division:'',
            type:""
        }
    
    }
    
    getPost= async () => {
        try{
            const {data} = await axios.get('http://localhost:3001/entries');
            this.setState({posts:data});
            console.log(this.state.posts)
        }
        catch(err){
            console.error("Error fetching data from server",err)
        }
        
        // const data = await response.json()
    
        
    }
    
    createPost= async () => {
        try{
            const {date,day,month,year, category, amount, division, type}= this.state;
            // const day = this.state.date.day
            // const month = this.state.date.month
            // const year = this.state.date.year
            const {data:post} = await axios.post('http://localhost:3001/entries',{    
                date,    
                day,
                month,
                year,
                category,
                amount,
                type,
                division
            }
    
            );
            console.log(post)
            // const posts = [...this.state.posts]
            // posts.push(post)
            this.setState({day:'',month:'',year:'', category:'', amount:'', division:'', type:''});
            window.alert('Entry has been added!');
        }
        
        catch(err){
            console.error("Error creating data from server",err)
        }
        // console.log(this.state)
    }
    
    updatePost= async () => {
        // console.log(post)
        try{
            const {id,userId, title, body}= this.state;
            const {data:post} = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,{
                userId,
                title,
                body
            }
    
            );
            const posts = [...this.state.posts]
            const index = posts.findIndex((p)=>p.id===id)
            posts[index]=post
            this.setState({posts, userId:"", title:"", body:""});
            // this.setState({posts:data});
            // console.log(data)
            console.log(post)
        }
        
        catch(err){
            console.error("Error updating data from server",err)
        }
    }
    
    deletePost= async (post) => {
        try{
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
            // console.log(data)
            let posts = [...this.state.posts]
            posts = posts.filter((p)=>p.id!==post.id);
            this.setState({posts});
            console.log(this.state)
        }
        catch(err){
            console.error("Error deleting data from server",err)
        }
        
        console.log(post.id, 'Deleted')
    }
    
    handleChange=({target:{name,value}})=>{
        if(name==='amount' || name==='day'|| name==='month' || name==='year'){
            this.setState({[name]:parseInt(value)});    
        }
        else{this.setState({[name]:value});}
           
        // console.log(error);
        // console.log(value);
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();
    
        // if(){
            // this.getPost()
        // }else{
        this.createPost()
        // }
    }

    dateStyle = {
        width:"25px", 
        height:"25px",
        margin: '8px'
    }
    render(){
    
        return(
            <>
            <div className="add-form">
                <Link to="/home">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                </Link>
                <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>Date: </label>
                            <label>dd</label>
                            <input type="text" name='day' placeholder="00" value={this.state.day} style={this.dateStyle} onChange={this.handleChange}/>
                            <label>mm</label>
                            <input type="text" name='month' placeholder="00" value={this.state.month} style={this.dateStyle} onChange={this.handleChange}/>
                            <label>yy</label>
                            <input type="text" name='year' placeholder="full year" value={this.state.year} style={{width:'60px', height:'25px', margin:"8px"}} onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <div>
                            <label>Division:</label>
                            <br/>
                            <input style={{marginRight:'5px'}} type="radio" name='division' value='personal' onChange={this.handleChange}/>
                            <label style={{marginRight:'20px'}}>Personal</label>
                            <input style={{marginRight:'5px'}} type="radio" name='division' value='work' onChange={this.handleChange}/>                           
                            <label>Work</label>
 
                        </div>
                        <br/>
                        <div>
                            <label>Category: </label>
                            <input type="text" name='category' placeholder="fuel,salary,movies,etc" value={this.state.category} onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <div>
                            <label>Type: </label>
                            <br/>
                            <input style={{marginRight:'5px'}} type="radio" name='type' value='income' onChange={this.handleChange}/>
                            <label style={{marginRight:'20px'}}>Income</label>
                            <input style={{marginRight:'5px'}} type="radio" name='type' value='expense' onChange={this.handleChange}/>                           
                            <label>Expense</label>
 
                        </div>
                        <br/>
                        <div>
                            <label>Amount: </label>
                            <label>Rs. </label>

                            <input type="text" name="amount" value={this.state.amount} onChange={this.handleChange}/>
                        </div>
                        <br/>
                        <button className="add-form-submit" type="submit">Add</button>
                </form>
            </div>
            </>
        )
    }
}

export default AddEntry