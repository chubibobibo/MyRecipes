import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js'
//using router
const Router = express.Router();

//register 
Router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await UserModel.findOne({ username: username })
    if (foundUser) {
        res.json({ message: 'user already exists' })
    } else {
        const salt = await bcrypt.genSalt(12);
        const hashPwd = await bcrypt.hash(password, salt);
        const regUser = await new UserModel({ username: username, password: hashPwd });
        await regUser.save();
        res.json({ message: 'New User Created', regUser });

    }
});

//login
Router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await UserModel.findOne({ username });
    if (!foundUser) {
        res.json({ message: 'User does not exist' });
    } else {
        const loggedUser = await bcrypt.compare(password, foundUser.password);
        if (!loggedUser) {
            res.json({ message: 'invalid username or password' })
        } else {
            //signing a new token object
            const token = jwt.sign({ loggedId: foundUser.id }, 'electromagneticsecret')
            console.log(token)
            res.json({ message: `Welcome ${foundUser.username}`, foundUser, token })
        }
    }
})

export { Router as UserRoutes }//exporting Routers under the name od UserRoutes
