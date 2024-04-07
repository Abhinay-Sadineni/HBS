const UserService = require('../services/UserService');

//Login
async function login(req, res){
    try{
        const{email, password} = req.body;
        const result = await UserService.loginWithCredentials(email, password);
        if(result.success){
            res.status(200).json({token: result.token });
        }
        else{
            res.status(401).json({message: result.message });
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
        const{username, email, password, phone_number, country_code} = req.body;
        const result = await UserService.saveToDB(username, email, password, phone_number, country_code);
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
async function editProfile(req, res){
    try{
        const{user_id} = req.params;
        const newData = req.body;
        const result = await UserService.editProfile(user_id, newData);
        if(result.success){
            res.json({success: true, message: result.message});
        }
        else{
            res.status(404).json({message: result.message});
        }
    }
    catch(error){
        console.error('Error in editProfile controller:', error);
        res.status(500).json({success: false, message: "Server error"});
    }
}

module.exports ={
    login,
    signup,
    editProfile
};