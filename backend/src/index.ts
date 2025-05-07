import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
})); // Allow requests from frontend
app.use(express.json());

app.get('/', (req, res) => {
  res.send("1234");
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
