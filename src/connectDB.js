// Using Node.js `require()`
const mongoose = require('mongoose');
const dotenv = require("dotenv");
mongoose.set("strictQuery", false);

dotenv.config()
mongoose.set("strictQuery", false);

myDbConnection()
async function myDbConnection() {
    try {
        await mongoose.connect(process.env.mongoDB_URL, { useNewUrlParser: true });
        console.log('Connected Successfully')
        mongoose.connection.useDb('authors');
    } catch (error) {
        console.log('Error connecting to DB ::', error);
    }
}
const Schema = mongoose.Schema;
const authors = new Schema({
    name: String,
    year: String,
}, { collection: "authors" });
const AccountModel = mongoose.model('authors', authors);
AccountModel.find({})
    .then(function (data) {
        const [Data] = data;
        console.log('data', Data);
    })
    .catch(function (err) {
        console.log("loi", err);
    })


// const course = new Schema({
//     name: String,
//     teacher: String,
//     lesson: [],
//     address: {}
// }, { collection: 'course' });
// const CourseModel = mongoose.model('course', course);

// populate ( dung de lien ket 2 bang)
// AccountModel.find({ username: "populate" })
//     .populate('course')
//     .then(function (data) {
//         console.log('data', data);
//     })
//     .catch(function (err) {
//         console.log("loi", err);
//     })

// AccountModel.find({})
//     .then(function (data) {
//         console.log('data', data);
//     })
//     .catch(function (err) {
//         console.log("loi", err);
//     })
// console.log('check')

//create
// AccountModel.create({
//     username: "create",
//     password: "123"
// })

//update
// AccountModel.updateMany({
//     username: "nghia",
//     password: "123"
// }, {
//     username: "nghiaUdpate",
//     password: "123Udpate"
// })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("that bai");
//     })
//delete
// AccountModel.deleteMany({
//     username: "nghiaUdpate"
// })
//     .then(data => {
//         console.log(data)
//     })
//     .catch(err => {
//         console.log("that bai")
//     })