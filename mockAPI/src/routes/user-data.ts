import { Router } from "express";
import { userDB, type User, Users } from "../db/users";

const router = Router();

router.get("/user/:id", async (req, res) => {

    const id = req.params.id;

    const user = userDB.data.users.find((user) => user.id === id );

    if (user) {

        
        res.status(200).json(user);
    }

    else {

        res.status(404).json({"message": "Not Found"});
    }
})

router.get("/user", async (req, res) => {

    const users: User[] = userDB.data.users;

    if (users) {

        return res.status(200).json(users);
    }

    return res.status(404).json({"error": "Data not found"});
});

export default router;