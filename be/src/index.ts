import express from "express";
import cors from "cors";

import loginRouter from "./routes/login.route";
import registerRouter from "./routes/register.route";
import userRoutes from "./routes/user";
 import tagRoutes from "./routes/tag";
import reviewRoutes from "./routes/review";
import transactionRoutes from "./routes/transaction";

const app = express();
const port = 3001;

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:3000", // 👈 FE được phép gọi API
    credentials: true,               // 👈 Nếu có dùng cookie/session
  })
);
  
// Middleware parse body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/", loginRouter);
app.use("/", registerRouter);
app.use("/users", userRoutes);
app.use("/tags", tagRoutes);
app.use("/reviews", reviewRoutes);
app.use("/", transactionRoutes);

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
