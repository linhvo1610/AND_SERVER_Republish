exports.request_login=(req,res,next)=>{
    if(req.session.userLogin){
        //có tồn tại thông tin user login: đã đăng nhập
        next();
    }else{
      return  res.redirect('/login');
    }
}
exports.norequest_login=(req,res,next)=>{
    if(!req.session.userLogin){
        //có tồn tại thông tin user login: đã đăng nhập
        next();
    }else{
       return res.redirect('/');
    }
}