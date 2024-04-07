const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class UserService {
    //Login with credentials
    static async loginWithCredentials(email, password) {
        try{
            const user = await User.findOne({where: {email}});
            if(!user || !(await bcrypt.compare(password, user.password))){
                return {success: false, message: "Invalid email or password"};
            }

            const token = jwt.sign({user_id: user.user_id}, process.env.SECRET_KEY);
            return {success: true, token};
        }
        catch (error) {
            console.error('Error logging in with credentials:', error);
            return {success: false, message: "Server error"};
        }
    }

    //Login with token
    static async loginWithToken(token) {
        try{
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findOne({ where: { user_id: decoded.user_id } });

            if(!user){
                return {success: false, message: "User not found"};
            }

            return {success: true, user};
        }
        catch (error) {
            console.error('Error logging in with token:', error);
            return {success: false, message: "Invalid token"};
        }
    }

    //Save to db
    static async saveToDB(username, email, password, phone_number, country_code) {
        try{
            const old_email = await User.findOne({where: {email}});
            if (old_email) {
                return{success: false, message: "Email already in use"};
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                username,
                email,
                password: hashedPassword,
                phone_number,
                country_code
            });

            return {success: true, message: "User created successfully"};
        }
        catch (error) {
            console.error('Error saving user to database:', error);
            return {success: false, message: "Server error"};
        }
    }

    //Edit user profile
    static async editProfile(user_id, newData) {
        try{
            const user = await User.findOne({ where: { user_id } });
            if(!user){
                return {success: false, message: "User not found"};
            }

            if(newData.password){
                newData.password = await bcrypt.hash(newData.password, 10);
            }
    

            await user.update(newData);
            return {success: true, message: "Profile updated successfully"};
        }
        catch(error){
            console.error('Error editing user profile:', error);
            return {success: false, message: "Server error"};
        }
    }
}

module.exports = UserService;