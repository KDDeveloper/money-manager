import React from "react";
import axios from "axios";
import { Link ,withRouter,Redirect} from "react-router-dom";
import "./App.css";
import jwt from "jsonwebtoken";

const validateDate = RegExp(/\d+|^$/);

class AddEntry extends React.Component{
    constructor(props){
        super(props);
        this.state={
                _id:"",
                date: new Date(),
                day:"",
                month:"",
                year:'',
            category:"",
            posts:[],
            amount:"",
            division:'work',
            type:"income",
            redirect:"",
            errors:{
                day:"",
                month:"",
                year:"",
                category:""
            }
        }
    
    }


    
    getPost= async () => {
        try{
            const {data} = await axios.get('https://kd-money-manager-backend.herokuapp.com/entries');
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
            const {data:post} = await axios.post('https://kd-money-manager-backend.herokuapp.com/entries',{    
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

    goback  = ()=>{
        if(this.state.redirect === true){
      return <Redirect to="/home"/>}
    }
    
    updatePost= async () => {
        // console.log(post)
        try{

            const {date,day,month,year, category, amount, division, type,_id}= this.state;

            const {data} = await axios.put(`http://localhost:3001/entries/${_id}`,{
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
            this.setState({day:'',month:'',year:'', category:'', amount:'', division:'', type:'',_id:""});
            // this.setState({posts:data});
            // console.log(data)
            console.log(data);
            window.alert("The entry has been updated");
            this.setState({redirect:true});
        }
        
        catch(err){
            console.error("Error updating data from server",err)
        }
    }
    
    
    handleChange=({target:{name,value}})=>{
        let error = this.state.errors

        //to add date as a number in the database for filter purposes
        if(name==='amount' || name==='day'|| name==='month' || name==='year'){
        
            //validating if added value is a number
            if(validateDate.test(value)){
        
                //checking if added if there is a number or empty string(so we dont get NaN as a response)
                if(value===""){
                    this.setState({[name]:value});   

                } else{this.setState({[name]:parseInt(value)});}
                
            }
        }
        else{this.setState({[name]:value});};
        
        let day = this.state.day;
        let month = this.state.month;
        let year = this.state.year;




        switch (name) {
            case 'day':{
                if(value.length>2||value>31){
                    error.day = "Please enter a valid day."
                } else{
                    error.day = ""
                }
                } 
                break;
            case 'month':{
                if(value.length>2||value>12){
                    error.month = "Please enter a valid month."
                } else{
                    error.month= ""
                }
            } 
                break;
            case 'year':{
                if(value.length>4||value>2021){
                    error.year = "Please enter a valid year."
                } else{
                    error.year = ""
                }
            } 
                break;
            case 'category':{
                if(value.length>20){
                    error.category = "Category is too long."
                } else{
                    error.category = ""
                }
            } 
                break;
        }
        
           
        // console.log(error);
        // console.log(value);
    }
    
    handleSubmit=(e)=>{
        e.preventDefault();

        if(this.state.errors.day===""&&this.state.errors.month===""&&this.state.errors.year===""&&this.state.errors.category===""){
            if(this.state._id!=""){
                this.updatePost();
            } else{
                this.createPost();
            }
        } else{
        window.alert("Please add valid entries")
        }
    }

    updateField = async()=>{
        let params = this.props.match.params
        let id = params.id
        if(id.length>3){
        let {data} = await axios.get(`http://localhost:3001/entries/${id}`);
            this.setState({new:data})
            this.setState({...data})
            console.log(this.state._id);

        }
    }

    componentDidMount=()=>{
        this.updateField()
    }

    componentWillUnmount=()=>{
        this.setState({redirect:false})
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
                {this.goback()}
                <form onSubmit={this.handleSubmit}>
                        <div>
                            <label>Date: </label>
                            <label>dd</label>
                            <input type="text" name='day' placeholder="00" value={this.state.day} style={this.dateStyle} onChange={this.handleChange}/>
                            <label>mm</label>
                            <input type="text" name='month' placeholder="00" value={this.state.month} style={this.dateStyle} onChange={this.handleChange}/>
                            <label>yy</label>
                            <input type="text" name='year' placeholder="full year" value={this.state.year} style={{width:'60px', height:'25px', margin:"8px"}} onChange={this.handleChange}/>
                            <br/>
                            <span style={{color:"red"}}>{this.state.errors.day}</span>
                            <span style={{color:"red"}}>{this.state.errors.month}</span>
                            <span style={{color:"red"}}>{this.state.errors.year}</span>
                        </div>
                        <br/>
                        <div>
                            <label>Division:</label>
                            <br/>
                            <input style={{marginRight:'5px'}} type="radio" checked={this.state.division==="personal"} name='division' value='personal' onChange={this.handleChange}/>
                            <label style={{marginRight:'20px'}}>Personal</label>
                            <input style={{marginRight:'5px'}} type="radio" checked={this.state.division==="work"} name='division' value='work' onChange={this.handleChange}/>                           
                            <label>Work</label>
                        </div>
                        <br/>
                        <div>
                            <label>Category: </label>
                            <input type="text" name='category' placeholder="fuel,salary,movies,etc" value={this.state.category} onChange={this.handleChange}/>
                            <br/>
                            <span style={{color:"red"}}>{this.state.errors.category}</span>
                        </div>
                        <br/>
                        <div>
                            <label>Type: </label>
                            <br/>
                            <input style={{marginRight:'5px'}} checked={this.state.type==="income"} type="radio" name='type' value='income' onChange={this.handleChange}/>
                            <label style={{marginRight:'20px'}}>Income</label>
                            <input style={{marginRight:'5px'}} checked={this.state.type==="expense"} type="radio" name='type' value='expense' onChange={this.handleChange}/>                           
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

export default withRouter(AddEntry)
