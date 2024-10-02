import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { paymentRouter } from './routes/paymentRoutes';
import { healthRouter } from './routes/healthRoutes';

const PORT = 3000;

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
const server = http.createServer(app);

app.use('/health', healthRouter)
app.use('/payment', paymentRouter);

server.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}/`);
});
// docker compose -f docker-compose.yml -f docker-compose-override.yml build payment.api
