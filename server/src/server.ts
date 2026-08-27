import { app } from "./app";
import { connectDB } from "./db";

async function mainEntryFunction() {
  await connectDB();

  const port = Number(process.env.PORT || 5000);

  app.listen(port, () => {
    console.log(`Server is now listening to port ${port}`);
  });
}

mainEntryFunction().catch((err) => {
  console.error("failed to start", err);
  process.exit(1);
});
