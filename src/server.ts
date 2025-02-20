import express, { Request, Response } from "express";

const app = express();
const PORT = 31415;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript & Express!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
