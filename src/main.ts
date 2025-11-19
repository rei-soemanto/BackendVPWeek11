// src/server.ts
import express from 'express';
// Don't forget to import and configure dotenv
import 'dotenv/config'; 
import router from './routes/private-api';
import { errorMiddleware } from './middlewares/middleware-error'; // Import error middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 
app.use('/api', router);

// --- Global Error Handler MUST be last ---
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});