const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
module.exports.uploadfile = (req, res, uploadPath = "") => {
    if (req.method.toLowerCase() === "post") {
        if (uploadPath ? !fs.existsSync(path.join(__dirname, "..", 'uploads', uploadPath)) : !fs.existsSync(path.join(__dirname, "..", "uploads", "files"))) {
            fs.mkdirSync(uploadPath ? `../uploads/${uploadPath}` : '../uploads/files', { recursive: true })
            console.log('saaaaaaaaaa', __dirname);
            console.log(Boolean(uploadPath));

        }

        const form = new formidable.IncomingForm({
            uploadDir: uploadPath ? path.join(__dirname, "../uploads", uploadPath) : path.join(__dirname, "../uploads", "files"),
            keepExtensions: true,
            multiples: true,
            maxFieldsSize: 5 * 1024 * 1024,
            allowEmptyFiles: false,
            filter: function ({ name, originalFilename, mimetype }) {
                // keep only images
                return mimetype && mimetype.includes("image");
            }
        });

        form.parse(req, (err, fields, files) => {
        })
        return 'file uplodade'
    } else { 
        const htmlForm = fs.readFileSync(path.join(__dirname , ".." , "view" ,"uploadfi le.html" ) , "utf-8")
        // res.write(htmlForm)
        return htmlForm

    }
}
