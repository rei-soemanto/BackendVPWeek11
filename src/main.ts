import express from "express";
import { PORT } from "./utils/env-util";
import router from './routes/private-api';

const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(PORT || 3000, () => {
    console.log(`Connected to port ${PORT}`);
})