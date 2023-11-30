const MyModel = require('../../models/model')

exports.listComics = async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }

    let dieu_kien =null;
    if(typeof(req.query.name)!='undefined'){
        let name =req.query.name;
        dieu_kien={name:name};
        console.log(dieu_kien);
    }
    //code xử lý lấy danh sách
    let list = []
    try {
        list = await MyModel.comicModel.find(dieu_kien);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}

exports.listComicsUP = async (req, res, next) => {
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
        list = await MyModel.comicModel.findById(req.params.idcomic);
        dataR.data = list;
    }
    catch (err) {
        dataR.msg = err.message;
    }

    //trả về client
    res.json(dataR);
    console.log(dataR);
}

exports.addComics =async (req, res, next) => {
    let dataR = {
        status: 1,
        msg: "ok"
    }
    if(req.method =='POST'){
        // xử lý ghi CSDL ở đây
        // kiểm tra hợp lệ dữ liệu ở chỗ này.


        // tạo đối tượng model 
        let objComic = new MyModel.comicModel();
        objComic.name = req.body.name;
        objComic.description = req.body.description;
        objComic.author=req.body.author;
        objComic.year=req.body.year;
        objComic.cover = req.body.cover;
        objComic.content=req.body.content;

        
        try{
            let dataR = await objComic.save();
            
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

exports.updateComics =async (req, res, next) => {
    let data = {
        status: 1,
        msg: "update"
    }

    if(req.method =='PUT'){

    
        try{
            await MyModel.comicModel.updateOne({_id:req.params.idcomic},{$set: {name:  req.body.name, description:  req.body.description,author: req.body.author,year:req.body.year,cover:req.body.cover,content:req.body.content}});
            console.log(data);

            console.log("Đã cập nhật thành công");
           
        }catch(err){
            console.log(err);
            data.msg = err.message;
        }
 
    }
    res.json(data)

}

exports.deleteComics =async (req, res, next) => {
    let data = {
        status: 1,
        msg: "delete"
    }
    let dieu_kien =null;
    if(typeof(req.query.id_comic)!='undefined'){
        let id_comic =req.query.id_comic;
        dieu_kien={id_comic:id_comic};
        console.log(dieu_kien);
    }

    let objComic = await MyModel.comicModel.findById(  req.params.idcomic  );
    let objComment = await MyModel.commentModel.find(dieu_kien)
    console.log(objComment);
    console.log("comment"+objComic);
        
        try{
             
            // update dữ liệu
            // await myModel.spModel.updateOne( {_id:  req.params.idsp},   objSP );
             await MyModel.comicModel.findByIdAndDelete({_id:req.params.idcomic});
             await MyModel.commentModel.deleteMany({id_comic:req.params.idcomic});
            console.log("Đã xóa thành công");
        }catch(err){
            console.log(err);
            msg ='Lỗi '+ err.message;

        }
    res.json(data)

}
