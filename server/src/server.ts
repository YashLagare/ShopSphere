import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./db";
import { errorHandler } from "./middleware/errorhandler";
import { notFound } from "./middleware/notFound";
import { adminDashboardRouter } from "./routes/admin/dashboard.routes";
import { adminOrderRouter } from "./routes/admin/orders.routes";
import { adminProductRouter } from "./routes/admin/product.routes";
import { adminPromoRouter } from "./routes/admin/promo.routes";
import { adminSettingsRouter } from "./routes/admin/settings.routes";
import { authRouter } from "./routes/auth/auth.routes";
import { customerAddressRouter } from "./routes/customer/address.routes";
import { customerCartWishlistRouter } from "./routes/customer/cart-wishlist.routes";
import { customerCheckoutWithPointsRouter } from "./routes/customer/checkout-with-points.routes";
import { customerCheckoutRouter } from "./routes/customer/checkout.routes";
import { customerHomeRouter } from "./routes/customer/home.routes";
import { customerOrderRouter } from "./routes/customer/orders.routes";
import { customerProductRouter } from "./routes/customer/product.routes";
import { customerPromoRouter } from "./routes/customer/promo.routes";
import { ok } from "./utils/envelope";

async function mainEntryFunction() {
  await connectDB();

  const app = express();

  const corsOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: corsOrigins,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(
    clerkMiddleware({
      publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      secretKey: process.env.CLERK_SECRET_KEY,
    }),
  );

  app.get("/health", (_req, res) => {
    res.status(200).json(ok({ message: "Server is healthy/in running state" }));
  });

  // auth routes
  app.use("/auth", authRouter);

  // customer routes
  app.use("/customer", customerHomeRouter);
  app.use("/customer", customerProductRouter);
  app.use("/customer", customerAddressRouter);
  app.use("/customer", customerPromoRouter);
  app.use("/customer", customerCartWishlistRouter);
  app.use("/customer", customerCheckoutRouter);
  app.use("/customer", customerCheckoutWithPointsRouter);
  app.use("/customer", customerOrderRouter);

  // admin routes
  app.use("/admin", adminProductRouter);
  app.use("/admin", adminPromoRouter);
  app.use("/admin", adminOrderRouter);
  app.use("/admin", adminSettingsRouter);
  app.use("/admin", adminDashboardRouter);

  app.use(notFound);
  app.use(errorHandler);

  const port = Number(process.env.PORT || 5000);

  app.listen(port, () => {
    console.log(`Server is now listening to port ${port}`);
  });
}

mainEntryFunction().catch((err) => {
  console.error("failed to start", err);
  process.exit(1);
});
