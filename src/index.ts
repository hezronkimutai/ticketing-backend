import express from 'express';
import userRoutes from './routes/user.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
