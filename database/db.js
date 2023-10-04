import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection=()=>{
    const DB_URI=`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-qyoluar-shard-00-00.mcuncom.mongodb.net:27017,ac-qyoluar-shard-00-01.mcuncom.mongodb.net:27017,ac-qyoluar-shard-00-02.mcuncom.mongodb.net:27017/?ssl=true&replicaSet=atlas-5rp2y4-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
        mongoose.connect(DB_URI,{useNewUrlParser:true})
        console.log('Db connected');
    }
    catch(error)
    {
        console.log('Error while connecting to db',error.message);
    }
}
export default Connection;