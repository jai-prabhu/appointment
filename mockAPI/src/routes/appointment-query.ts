import { Router } from "express";
import { type Appointment, Appointments, appointmentDB } from "../db/appointment"
const router = Router();

router.post("/booking/create-appointment", async (req, res) => {

    const newAppointment: Appointment = req.body;

    

    const reqRes = await Appointments.create(newAppointment);

    

    if (reqRes.created) {

        return res.status(201).json({"message": "appointment created", "id": `${reqRes.id}`});
    }

    else {
        return res.status(400).json({"error": "Failed to create the entry"});
    }
});

router.get("/appointments/:id", async (req, res) => {

    const id = req.params.id;

    const reqAppointment = appointmentDB.data.appointments.find(appointment => appointment.id === id);

    

    if (reqAppointment) {

        return res.status(200).json(reqAppointment);
    }

    else {
        return res.status(404).json({"error": "Data not Found"});
    }
});

router.get("/appointments", async (req, res) => {

    const appointments = appointmentDB.data.appointments;

    if (appointments) {

        return res.status(200).json(appointments);
    }

    else {
        return res.status(404).json({"error": "Data not found"});
    }
})

router.get("/appointments/filter/:id", async (req, res) => {

    const Id = req.params.id;

    const appointments: Appointment[] = appointmentDB.data.appointments.filter(appointment => appointment.user.id === Id);

    return res.status(200).json(appointments);
})

router.get("/appointments/filter/doc/:id", async (req, res) => {

    const id = req.params.id;

    const appointments: Appointments[] = appointmentDB.data.appointments.filter(appointment => appointment.doc.user.id === id);

    return res.status(200).json(appointments);
})

router.patch("/appointments/update/:id", async (req, res) => {

    const id = req.params.id;

    const data = req.body;

    const appointment = appointmentDB.data.appointments.find(appointment => appointment.id === id);

    if (appointment) {

        await Appointments.update(appointment, data);
        res.status(203).json({"message": "patched"});
    }

    else {
        res.status(404).json({"error": "data not found"});
    }
})


export default router;