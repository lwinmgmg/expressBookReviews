const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
    if (req.session.authorization){
        const { accessToken } = req.session.authorization
        jwt.verify(accessToken, "secret", (err, data)=>{
            if (err){
                return res.status(403).json({message: `Error on validating token ${err}`});
            }
            req["user"] = data.username;
            next();
        })
    }else{
        return res.status(403).json({message: "Authorization required."})
    }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, "0.0.0.0",()=>console.log("Server is running"));
