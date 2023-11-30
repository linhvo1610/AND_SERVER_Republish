const MyModel = require('../../models/model')

exports.listUsers = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }

    let dieu_kien =null;
    if(typeof(req.query._id)!='undefined'&&typeof(req.body.username)!='undefined'){
        let _id =req.query._id;
        let username=req.query.username;
        dieu_kien={_id:_id,username:username};
        console.log(dieu_kien);
    }
    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.usersModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    res.json(dataR);
    console.log(dataR);
}

exports.listUsersUP = async (req, res, next) => {
    let dataR = {
        msg: "list"
    }

    let dieu_kien =null;
    if(typeof(req.query._id)!='undefined'){
        let _id =req.query._id;
        dieu_kien={_id:_id};
        console.log(dieu_kien);
    }
    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.usersModel.findById(req.params.iduser);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}

exports.addUsers =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 
        let objUser = new MyModel.usersModel();
        objUser.username = req.body.username;
        objUser.email = req.body.email;
        objUser.password = req.body.password;
        objUser.phone = req.body.phone;

        
        try{
            let dataR = await objUser.save();
            
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

exports.updateUsers =async (req, res, next) => {
    let data = {
        status: 1,
        msg: "update"
    }

    if(req.method =='PUT'){

    
        try{
            await MyModel.usersModel.updateOne({_id:req.params.iduser},{$set: {username:  req.body.username,password:req.body.password,email:req.body.email,phone:req.body.phone}});
            console.log(data);

            console.log("Đã cập nhật thành công");
           
        }catch(err){
            console.log(err);
            data.msg = err.message;
        }
 
    }
    res.json(data)

}

exports.deleteUsers =async (req, res, next) => {
    let data = {
        status: 1,
        msg: "delete"
    }

    let objUser = await MyModel.usersModel.findById(  req.params.iduser  );
    console.log( objUser);
        
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await MyModel.usersModel.findByIdAndDelete({_id:req.params.iduser});

            console.log("Đã xóa thành công");
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
    res.json(data)

}