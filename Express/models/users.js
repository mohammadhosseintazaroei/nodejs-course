const { Schema, model } = require('mongoose')
const UserSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    age: { type: String },
    profile_image: { type: String, default: "default.jpg" },
    role: { type: String, default: "USER", required: true },
    token: { type: String, default: "" }
}, {
    timestamps: true
});
const UserModel = model("user", UserSchema);
module.exports = {
    UserModel
}