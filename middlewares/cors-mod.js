const cors = (req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin,x-Request-With,Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods','GET','POST','PATCH','DELETE','OPTIONS');
    next()
}

module.exports = cors;