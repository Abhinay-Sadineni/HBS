const UserService = require('../services/UserService');

//Login
async function login(req, res){
    try{
        const{email, password, role} = req.body;
        const token = req.header('Authorization');

        if (email && password) {
            //Login with credentials
            const result = await UserService.login_with_cred(email, password, role);
            if(result.success){
                res.setHeader('Authorization', `Bearer ${result.token}`);
                res.status(200).json({message: "Logged in successfully"});
            }
            else{
                res.status(401).json({message: result.message});
            }
        }
        else if(token){
            //Login with token
            console.log(token)
            const result = await UserService.login_with_token(token.slice(7));
            if(result.success){
                res.status(200).json({user: result.user});
            }
            else{
                res.status(401).json({message: result.message});
            }
        }
        else{
            res.status(400).json({message: "Invalid request"});
        }
    }
    catch(error){
        console.error('Error in login controller:', error);
        res.status(500).json({message: "Server error" });
    }
}


//Signup
async function signup(req, res){
    try{
        const{username, email, password, phone_number, country_code, role} = req.body;
        const result = await UserService.save_to_DB(username, email, password, phone_number, country_code, role);
        if(result.success){
            res.status(201).json({message: result.message });
        }
        else{
            res.status(400).json({message: result.message });
        }
    }
    catch(error){
        console.error('Error in signup controller:', error);
        res.status(500).json({message: "Server error" });
    }
}


//Edit profile
async function edit_profile(req, res){
    try{
        const{user_id} = req.params;
        const newData = req.body;
        const result = await UserService.edit_profile(user_id, newData);
        if(result.success){
            res.json({success: true, message: result.message});
        }
        else{
            res.status(404).json({message: result.message});
        }
    }
    catch(error){
        console.error('Error in edit_profile controller:', error);
        res.status(500).json({success: false, message: "Server error"});
    }
}

module.exports ={
    login,
    signup,
    edit_profile
};