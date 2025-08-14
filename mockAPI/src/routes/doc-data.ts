import { Router } from "express";
import { docDB, Docs, type Doc } from "../db/doc";

const router = Router();

router.get("/doc/:id", async (req, res) => {

    const id = req.params.id;

    const doc = docDB.data.docs.find((doc) => doc.user.id === id );

    if (doc) {

        
        res.status(200).json(doc);
    }

    else {

        res.status(404).json({"message": "Not Found"});
    }
})

router.get("/doc", async (req, res) => {

    const docs: Doc[] = docDB.data.docs;

    if (docs) {

        return res.status(200).json(docs);
    }

    return res.status(404).json({"error": "Data not found"});
});

router.patch("/doc/update/:id", async (req, res) => {

    const id = req.params.id;

    const data = req.body;

    const doc = docDB.data.docs.find(doc => doc.user.id === id);

    console.log(data, doc?.user.id);

    if (doc) {

        await Docs.update(doc, data);
        res.status(203).json({"message": "patched"});
    }

    else {
        res.status(404).json({"error": "data not found"});
    }
})

export default router;