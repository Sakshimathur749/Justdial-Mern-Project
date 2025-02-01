const {Schema,model } = require('mongoose')
const bcrypt = require('bcryptjs');

const AdminSchema = new Schema({
    email: {type: String, required: true, unique: true,},
    password: {type: String,  required: true, },
    name:{type:String , required:true}
})
AdminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

const Admin = new model('admin' , AdminSchema);
module.exports = Admin