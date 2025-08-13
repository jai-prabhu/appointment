import { Router } from "express";
import { type Prescribtion, Prescribtions, presDB } from "../db/perscribtions";

const router = Router();

router.post("/create-prescribtion", async (req, res) => {

    const newPrescribtion: Prescribtion = req.body;

    

    const reqRes = await Prescribtions.create(newPrescribtion);

    

    if (reqRes.created) {

        return res.status(201).json({"message": "prescribtion created", "id": `${reqRes.id}`});
    }

    else {
        return res.status(400).json({"error": "Failed to create the entry"});
    }
});

router.get("/prescribtions/:id", async (req, res) => {

    const id = req.params.id;

    const reqPrescribtion = presDB.data.prescribtions.find(prescribtion => prescribtion.id === id);

    

    if (reqPrescribtion) {

        return res.status(200).json(reqPrescribtion);
    }

    else {
        return res.status(404).json({"error": "Data not Found"});
    }
});

router.get("/prescribtions", async (req, res) => {

    const prescribtions = presDB.data.prescribtions;

    if (prescribtions) {

        return res.status(200).json(prescribtions);
    }

    else {
        return res.status(404).json({"error": "Data not found"});
    }
})

router.get("/prescribtions/filter/user/:id", async (req, res) => {

    const Id = req.params.id;

    const prescribtions: Prescribtion[] = presDB.data.prescribtions.filter(prescribtion => prescribtion.appointment.user.id === Id);

    return res.status(200).json(prescribtions);
})

router.get("/prescribtions/filter/doc/:id", async (req, res) => {

    const id = req.params.id;

    const prescribtions: Prescribtion[] = presDB.data.prescribtions.filter(prescribtion => prescribtion.appointment.doc.user.id === id);

    return res.status(200).json(prescribtions);
})

router.patch("/prescribtions/update/:id", async (req, res) => {

    const id = req.params.id;

    const data = req.body;

    const prescribtion = presDB.data.prescribtions.find(prescribtion => prescribtion.id === id);

    if (prescribtion) {

        await Prescribtions.update(prescribtion, data);
        res.status(203);
    }
})

export default router