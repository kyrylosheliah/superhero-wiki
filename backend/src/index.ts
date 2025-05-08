import express from 'express';
import cors from 'cors';
import { mapAllEndpoints } from './endpoints';

const app = express();

// Allow requests from frontend
app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send("1234");
});

mapAllEndpoints(app);

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
