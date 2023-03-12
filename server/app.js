const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

// dotenv.config({path:'./config.env'});
// require('./db/conn');
// const User = require('./model/schema');

// app.use(require('./router/auth'));

// const PORT = process.env.PORT;

// // const middleware = (req, res, next) => {
// //     console.log('Hello from middleware');
// //     next();
// // }

// // middleware();

// app.get('/', (req, res) => {
//     console.log("Hello !");
// })

// app.listen(PORT, () => {
//     console.log(`Server is running at ${PORT}`);
// })

main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/practice',{
//     useNewUrlParser: true,
//   });
  
//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

// const userSchema = new mongoose.Schema({
//     name: String,
//     password: String
// });

// const User = mongoose.model('User', userSchema);

// mongodb+srv://chinmay:<password>@cluster0.6lh6rlw.mongodb.net/?retryWrites=true&w=majority

// mongodb://127.0.0.1:27017/mern-project

async function main() {
  await mongoose.connect('mongodb+srv://chinmay:ctp43@cluster0.6lh6rlw.mongodb.net/mern-project',{
    useNewUrlParser: true,
  });
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
       fname: String,
       lname: String,
       roll: String,
       dept: String,
       email: String,
       password: String,
       city: String,
       state: String,
       zip: String
   });

const User = mongoose.model('User', userSchema);   

const loginSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  roll: String,
  date: String,
});

const Login = mongoose.model('Login', loginSchema);

app.get("/api", (req, res) => {
  res.send("Hi");
})

app.post("/api", async(req, res) => {
  const body = req.body;

  const check = await User.findOne({roll: body.roll});

  if(check){
    res.json("exists")
  }else{
    console.log(body);
    res.status(200).send({status: 'received'})
    const user1 = new User(body);
    User.insertMany([user1]);
  }

  
})

app.post("/check", async(req, res) => {

  const userData = req.body;

  const check = await User.findOne({roll: userData.roll, password: userData.password});
  // function (err, logins){
  //   if(err){
  //     console.log(err)
  //   }else if(check){
  //     var newDate = new Date().toLocaleString();
  //     const newlogin = {
  //       fname: logins.fname,
  //       lname: logins.lname,
  //       roll: logins.roll,
  //       date: newDate
  //     }
  //     const login1 = new Login(newlogin);
  //     Login.insertMany([login1]);
  //   }
  // }
  if(check){
    var newDate = new Date().toLocaleString();
    const newlogin = {
      fname: check.fname,
      lname: check.lname,
      roll: check.roll,
      date: newDate
    }
    const login1 = new Login(newlogin);
    Login.insertMany([login1]);
    res.json("exists")
  }else {
    res.json("dne")
  }
})

app.listen(5000, () => {
  console.log("listening on port 5000");
})



// user.save();