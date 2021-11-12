const express = require("express");
const mongo = require("./services/mongo");
const entriesRoutes = require("./route/entries.route");
const PORT = process.env.PORT||3001;
const app= express();
const cors = require("cors");

(async()=>{

    try{
        app.use(cors())        
    //MongoBD connect
   await mongo.connect()
  
  app.use(express.json())
  
  

  app.use((req, res, next)=>{
      console.log(" common middleware Called!")
      next();
  })

  app.use("/entries",entriesRoutes);
  
  
//   if(process.env.NODE_ENV==='production'){

//   }
  app.listen(PORT,()=>{console.log(`server is running at post:${PORT}`)});
  }
  catch(err){
    console.log("Error starting Server",err)
  }
  })()