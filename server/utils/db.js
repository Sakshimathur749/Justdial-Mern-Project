const mongoose = require('mongoose');
const URI =process.env.MONGODB_URL;

const connectdb = async () =>{
    try {
        await mongoose.connect(URI);
        console.log('connection successful to DB')        
    } catch (error) {
        console.error("Database connection failed");
        process.exit
    }
    
}

module.exports = connectdb