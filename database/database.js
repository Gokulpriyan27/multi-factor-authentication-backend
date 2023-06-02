const mongoose =require("mongoose");

const dbConnect =async()=>{
  try {
    const connection = await mongoose.connect(process.env.DB_URL,{
      useNewUrlParser:true,
      useUnifiedTopology:true
    });
    if(connection){
      console.log(`Connected to database`)
    }
  } catch (error) {
    console.log("Error connecting to database")
  }
}

module.exports=dbConnect;