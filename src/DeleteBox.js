import React from "react";
import {setState} from "react"
import { Link,useParams } from "react-router-dom";
import axios from "axios";

const DeleteEntry = ()=>{
    const {deleteId}=useParams()
    const deletePost= async (postId) => {
        try{
           let {data} = await axios.delete(`http://localhost:3001/entries/${postId}`);
            console.log(data)
        }
        catch(err){
            console.error("Error deleting data from server",err)
        }
        
        console.log(postId, 'Deleted')
    }


    return(
        <>
        <div className="add-form">
        <Link to="/home">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/></svg>
                </Link>
            <div className="delete-box">
                <h2>
                    Are you sure you want to delete this entry?
                </h2>
                <div className="del-btns">
                    <Link to="/home" > <button id="btn1">Cancel </button> </Link>
                     <Link to="/home" onClick={()=>deletePost(deleteId)}><button id="btn2" >Delete</button></Link>
                </div>          
            </div>
        </div>
        </>
    )
}

export default DeleteEntry