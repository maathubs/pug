var User=require("../models/user.js")
var bcrypt=require("bcrypt")
function login(loginData, res){
    console.log("login function involked")
    User.find({
        email: loginData.username.trim(),
        password: loginData.password.trim()
    }).then((result)=>{
        console.log("result:", result)
        if(result.length==0){
            console.log("No such user")
        }
        else{
            console.log("user found")
            User.find({ _id: { $ne:  result[0]._id} })
            .then((users)=>{
                console.log("users:", users)
                res.render("admin",{users:users})

                // if(result.length==0){
                //     console.log("No such user")
                // }
                // else{
                //     console.log("user found")
                // }
            },(error)=>{
                console.log("error while login", error)
            })
        }
    },(error)=>{
        console.log("error while login")
    })
    
}
function passwordEncrypt(password){
    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error("There was an error", err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error("There was an error", err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                let resdata = {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  status: true,
                  status_code: "REGISTER_SUCCESS"
                };
                res.status(200).json(resdata);
              });
            }
          });
        }
      });
}
function changeStatus(req, res) {
  return function(req, res) {
    console.log('Change status function is invoked')
    var userId = req.body.userId;
    User.find({
      _id: userId
    }).then((user) => {
      console.log('User found: ', user);
    })
  }
}
module.exports={
    login: login,
    changeStatus: changeStatus
}