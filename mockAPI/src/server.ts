import express from "express";
import cors from "cors";
import { Users } from "./db/users";
import { Docs } from "./db/doc";
import { Appointments } from "./db/appointment"
import authRoute from "./routes/auth";
import userDataRoute from "./routes/user-data";
import docDataRoute from "./routes/doc-data";
import appointmentRoute from "./routes/appointment-query";
import presRouter from "./routes/prescribtion-query";
import { Prescribtions } from "./db/perscribtions";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;

Users.init();
Docs.init();
Appointments.init();
Prescribtions.init();


app.use("/api/auth", authRoute);
app.use("/data/user-query", userDataRoute);
app.use("/data/doc-query", docDataRoute);
app.use("/data/appointment-query", appointmentRoute);
app.use("/data/pres-query", presRouter);

app.get("/", (req, res) => {

    res.send(200).json({"message": "welcome"});
})

app.listen(
    PORT, () => {

        console.log("Server started at http://localhost:", PORT)
    }
);
