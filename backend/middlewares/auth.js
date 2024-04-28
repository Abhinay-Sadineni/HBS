const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try{
        let token = req.headers.authorization;
        if(token){
            token = token.split(' ')[1];
            let user = jwt.verify(token, process.env.SECRET_KEY);
            req.user_id = user.user_id;
            console.log(req.user_id)
            next();

        }
        else{
            res.status(401).json({message: "Unauthorized user"});
        }

    }
    catch(error){
        console.log(error);
        res.status(401).json({message: "Unauthorized user"});
    }
}


module.exports = auth;