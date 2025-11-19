import express from 'express';
import 'dotenv/config'; 
import router from './routes/private-api';
import { errorMiddleware } from './middlewares/error-middleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use('/api', router);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});