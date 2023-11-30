var db= require('./db');
const userSchema = new db.mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true}
},{collection:'users'});
const chatSchema = new db.mongoose.Schema({
    users: [{
      type: db.mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }],
    messages: [{
      sender: {
        type: db.mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  }, { collection: 'chats' });
  const staffSchema = new db.mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true}
},{collection:'users'});
let usersModel = db.mongoose.model('usersModel',userSchema);
let chatModel = db.mongoose.model('chatModel',chatSchema);
module.exports={
    usersModel,chatModel
}