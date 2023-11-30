const MyModel = require('../../models/model')


exports.getOneToOneConversations = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    const otherUserId = req.query.otherUserId;

    // Find the chat where the users array contains both userId and otherUserId
    const chat = await MyModel.chatModel.findOne({
      users: { $all: [userId, otherUserId] }
    });

    if (!chat) {
      // If the chat doesn't exist, return an appropriate response
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Retrieve the details of the users involved in the chat
    const users = await MyModel.usersModel.find({ _id: { $in: chat.users } });

    res.json({ chat, users });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving conversations' });
  }
};
exports.addMessageToChat = async (req, res, next) => {
    try {
      const chatId = req.params.chatId;
      const { sender, content } = req.body;
  
      // Find the chat by its ID
      const chat = await MyModel.chatModel.findById(chatId);
  
      if (!chat) {
        // If the chat doesn't exist, return an appropriate response
        return res.status(404).json({ message: 'Chat not found' });
      }
  
      // Add the new message to the chat
      chat.messages.push({ sender, content });
  
      // Save the updated chat to the database
      const savedChat = await chat.save();
  
      res.status(201).json({ chat: savedChat });
    } catch (err) {
      res.status(500).json({ message: 'Error adding message to chat' });
    }
  };
exports.addChat = async (req, res, next) => {
    try {
      const { userId, otherUserId, content } = req.body;
  
      // Create a new chat document
      const chat = new MyModel.chatModel({
        users: [userId, otherUserId],
        messages: [
          {
            sender: userId,
            content: content
          }
        ]
      });
  
      // Save the chat to the database
      const savedChat = await chat.save();
  
      res.status(201).json({ chat: savedChat });
    } catch (err) {
      res.status(500).json({ message: 'Error adding chat' });
    }
  };

exports.addComment =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 
        let objComment = new MyModel.commentModel();
        objComment.comment = req.body.comment;
        objComment.date = new Date();
        objComment.id_user=req.body.id_user;
        objComment.id_comic=req.body.id_comic;
;

        
        try{
            let dataR = await objComment.save();
            
            console.log(dataR);

            console.log("Đã ghi thành công");
           
        }catch(err){
            console.log(err);
            dataR.msg = err.message;
        }
 
    }

    //code xử lý add


    //trả về client
    res.json(dataR)

}

exports.updateComment =async (req, res, next) => {
    let data = {
        status: 1,
        msg: "update"
    }

    if(req.method =='PUT'){

    
        try{
            await MyModel.commentModel.updateOne({_id:req.params.idcomment},{$set: {comment:  req.body.comment, date:  new Date(),id_user:req.body.id_user,id_comic:req.body.id_comic}});
            console.log(data);

            console.log("Đã cập nhật thành công");
           
        }catch(err){
            console.log(err);
            data.msg = err.message;
        }
 
    }
    res.json(data)

}

exports.deletecomment =async (req, res, next) => {
    let data = {
        status: 1,
        msg: "delete"
    }

    let objUser = await MyModel.commentModel.findById(  req.params.idcomment  );
    console.log( objUser);
        
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await MyModel.commentModel.findByIdAndDelete({_id:req.params.idcomment});

            console.log("Đã xóa thành công");
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
    res.json(data)

}
