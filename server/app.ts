import { Hono } from "hono";
import { cors } from "hono/cors";
import plantRoute from "./routes/plant.route";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ✅ API PREFIX (IMPORTANT)
app.route("/api/plants", plantRoute);

export default app;
