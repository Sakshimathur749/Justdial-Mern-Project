require('dotenv').config();
const CryptoJS = require('crypto-js'); 
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const connectdb = require('./utils/db')
const CategoryRouter= require('./routes/category-router')
const AdminRoute = require('./routes/admin-router');
const ProductRoutes = require('./routes/product-router')
const ReviewRoutes = require('./routes/review-router')
const SubcategoryRoutes= require('./routes/subcategory-router')
const ContactRoutes= require('./routes/contact-router')
const BusinessRoutes = require('./routes/bussiness-router')
const VendorRoutes= require('./routes/vendor-router')
const UserRoutes= require('./routes/user-router')
const ForgetPasswordRoutes= require('./routes/forgetpassword-router')
// const MembershipRoute= require('./routes/membership-router')
const path = require('path')
  
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads/subcategory', express.static(path.join(__dirname, '../../admin/src/images/subcategory_uploads')));
app.use('/uploads/category', express.static(path.join(__dirname, '../../admin/src/images/category_uploads')));
app.use('/uploads/image', express.static(path.join(__dirname, '../../admin/src/images/uploads/image')));
app.use('/uploads/gallery', express.static(path.join(__dirname, '../../admin/src/images/uploads/gallery')));
app.use('/uploads/productImages', express.static(path.join(__dirname, '../../admin/src/images/uploads/productImages')));
app.use('/api', CategoryRouter);
app.use('/api', SubcategoryRoutes);
app.use('/api', ProductRoutes);
app.use('/api', ReviewRoutes);
app.use('/api',ContactRoutes)
app.use('/api/admin', AdminRoute);
app.use('/api/business', BusinessRoutes);
app.use('/api', VendorRoutes);
app.use('/api/user',UserRoutes)
app.use('/api',ForgetPasswordRoutes)
// app.use('/api',MembershipRoute)
const PORT =process.env.PORT || 5000;
connectdb(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server is running at port :${PORT}`);
    })
})