import express from 'express';
import cors from 'cors';
import { mapAllEndpoints } from './endpoints';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use((req, res, next) => {
  if (req.headers['content-type']?.startsWith('multiplart/form-data')) {
    return next();
  } else {
    // const originalJson = res.json.bind(res);
    // res.json = (data) => {
    //   const safeData = JSON.parse(
    //     JSON.stringify(data, (_, v) =>
    //       typeof v === "bigint" ? v.toString() : v
    //     )
    //   );
    //   return originalJson(safeData);
    // };
    // next();
    express.json()(req, res, next);
  }
})

app.use(express.raw({ type: 'image/*', limit: '10mb' }));
app.use('/images', express.static('../images'));
app.use('/covers', express.static('../covers'));

mapAllEndpoints(app);

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
