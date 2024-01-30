import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const connect = ()=>{
    return mongoose.connect(`mongodb+srv://ravikumar030494:${process.env.PASSWORD}@cluster0.evly8w0.mongodb.net/?retryWrites=true&w=majority`);
    
}

export default connect