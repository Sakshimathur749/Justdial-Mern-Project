require('dotenv').config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const connectdb = require('./utils/db')
const CategoryRouter= require('./routes/category-router')
const ProductRoutes = require('./routes/product-router')
const path = require('path')

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'admin/src/images/uploads'))); 
app.use('/api', CategoryRouter);
app.use('/api', ProductRoutes);
const PORT =process.env.PORT || 5000;
connectdb(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running at port :${PORT}`);
    })
})