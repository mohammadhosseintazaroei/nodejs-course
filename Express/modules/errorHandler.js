function notFount(req,res,next) {
    return res.status(404).json({
        status: 404,
        success: false,
        message: 'routes are not fount'
    })
    const htmlFile = require('fs').readFileSync(path.join(__dirname, "404.html"), 'utf-8');
    return res.send(htmlFile.replace('KIND_OF_ERROR', '404'))
}
function expressErrorHandler (error , req, res , next) {
    const status = error?.status || 500
    const message = error?.message || 'intenal server error'
    return res.status(status).json({
        status,
        success: false,
        message
    })

}
module.exports = {
    notFount , expressErrorHandler
}