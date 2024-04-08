const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserService{
    //Validate user credentials
    static async validate_cred(email, password, role){
        try{
            const user = await User.findOne({where:{email}});
            if(!user || user.role !== role || !(await bcrypt.compare(password, user.password))){
                return{success: false, message: "Invalid email, password, or role"};
           }
            return{success: true, user};
        }
        catch(error){
            console.error('Error validating credentials:', error);
            return{success: false, message: "Server error"};
        }
    }

    //Create token
    static async create_token(user_id, role){
        try{
            const token_payload ={user_id, role};
            const token = jwt.sign(token_payload, process.env.SECRET_KEY);
            return{success: true, token};
        }
        catch(error){
            console.error('Error creating token:', error);
            return{success: false, message: "Server error"};
        }
    }

    //Validate token
    static async validate_token(token){
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findOne({where:{user_id: decoded.user_id}});

            if(!user){
                return{success: false, message: "User not found"};
           }

            if(user.role !== decoded.role){
                return{success: false, message: "Invalid user role"};
           }

            return{success: true, user};
        }
        catch(error){
            console.error('Error validating token:', error);
            return{success: false, message: "Invalid token"};
        }
    }

    //Login with credentials
    static async login_with_cred(email, password, role){
        const{success, message, user} = await this.validate_cred(email, password, role);
        if(success){
            const{success: tokenSuccess, token} = await this.create_token(user.user_id, user.role);
            if(tokenSuccess){
                return{success: true, token};
            }
            else{
                return{success: false, message: "Failed to create token"};
           }
        }
        else{
            return{success: false, message};
        }
    }

    //Login with token
    static async login_with_token(token){
        return await this.validate_token(token);
    }

    //Save to db
    static async save_to_DB(username, email, password, phone_number, country_code){
        try{
            const old_email = await User.findOne({where:{email}});
            if(old_email){
                return{success: false, message: "Email already in use"};
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                username,
                email,
                password: hashedPassword,
                phone_number,
                country_code,
                role
            });

            return{success: true, message: "User created successfully"};
        }
        catch(error){
            console.error('Error saving user to database:', error);
            return{success: false, message: "Server error"};
        }
    }

    //Edit user profile
    static async edit_profile(user_id, newData){
        try{
            const user = await User.findOne({where:{user_id}});
            if(!user){
                return{success: false, message: "User not found"};
            }

            if(newData.password){
                newData.password = await bcrypt.hash(newData.password, 10);
            }
    

            await user.update(newData);
            return{success: true, message: "Profile updated successfully"};
        }
        catch(error){
            console.error('Error editing user profile:', error);
            return{success: false, message: "Server error"};
        }
    }
}

module.exports = UserService;