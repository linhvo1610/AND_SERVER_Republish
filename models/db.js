const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ThucTap')
.catch((err)=>{
    console.log("loi csdl",err);
}).finally((xxx)=>{
    console.log(xxx);
})
module.exports={mongoose};