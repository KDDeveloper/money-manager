import React from "react";
import axios from "axios";
import mongo from "./services/mongo";

class Weekly extends React.Component{
    constructor(props){
        super(props);
        this.state={
            week:"",
            month:"",
            year:"",
            addMonth:[]
        }
    }

    getPost= async () => {
        try{
            const {data} = await axios.get('http://localhost:3001/entries');
        }
        catch(err){
            console.error("Error fetching data from server",err)
        }
        
        // const data = await response.json()
    
        
    }

    render(){
    //    const month = []


    //     for(let i=0;i<11;i++){
        
        
    //     month.push(<options value={`${i}`}>{i}</options>);}
    //     console.log(month);
        return(
            <>
                <form>
               <label for="week">Week:</label>
               <div classNam="week">
               <select name="week">
                   <option value="1">Week 1</option>
                   <option value="2">Week 2</option>
                   <option value="3">Week 3</option>
                   <option value="4">Week 4</option>
               </select>
               </div>
               <div>
                <select name="month">
                    {/* {month} */}
                </select>
               </div>
               </form>
            </>
        )
    }
}

export default Weekly