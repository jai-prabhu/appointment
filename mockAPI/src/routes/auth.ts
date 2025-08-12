import { Router } from "express";
import { Users, type User, Login, userDB } from  "../db/users"; 
import { Docs, type Doc, docDB } from "../db/doc"

const router = Router();

router.post("/user/register", async (req, res) => {

    const newUser: User = req.body;
    const reqRes = await Users.create(newUser);

    if (reqRes) {

        res.status(201).json({"message": "User Created"});
    }

    else {

        res.status(400).json({"message" : "User Already Exist"});
    }
})

router.post("/user/login", async (req, res) => {

    const data: Login = req.body;

    console.log(data.email)

    const user = userDB.data.users?.find(( user ) => user.email.toLowerCase() === data.email.toLowerCase() && user.password === data.password);

    console.log(userDB.data.users[0]?.email);
    
    if (user) {
        console.log(user.id);
        res.status(200).json({"id": `${user.id}`});
    }

    else {

        res.status(400).json({"message": `Login Failed`});
    }
})

router.post("/doc/register", async (req, res) => {

    const newUser: Doc = req.body;
    const reqRes = await Docs.create(newUser);

    console.log("I am here")

    if (reqRes) {

        res.status(201).json({"message": "User Created"});
    }

    else {

        res.status(400).json({"message" : "User Already Exist"});
    }
});

router.post("/doc/login", async (req, res) => {

    const data: Login = req.body;

    console.log(data.password)

    const user = docDB.data.docs?.find(( doc ) => doc.user.email.toLowerCase() === data.email.toLowerCase() && doc.user.password === data.password);
    
    console.log(user);

    if (user) {
        console.log(user.user.id);
        res.status(200).json({"id": `${user.user.id}`});
    }

    else {

        res.status(400).json({"message": `Login Failed`});
    }

});

export default router;