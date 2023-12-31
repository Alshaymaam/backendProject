const{ logEvents} = require('./logger')
const errorHandler= (error,req,res,next)=>{
    logEvents(`${error.name}:${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
    const status = res.statusCode? res.statusCode:500
    res.status(status)
    res.json({message:error.message, isError:true})

}
module.exports = errorHandler