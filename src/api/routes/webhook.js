import dotenv from "dotenv";
import { Router } from "express";

dotenv.config();
const router = Router();

router.get("/", (req, res) => {
  console.log(req.query);
  res.status(200).send(req.query.challenge);
});

router.post("/", async (req, res) => {
  const isValid = isNylasSignature(req);
  if (!isValid) {
    res.send(401);
  }
  console.log("Is valid secret ", isValid);
  // HERE you will process the webhook body and retrieve the object via Nylas API
  console.log(req.body);
  res.send(200);
});

function isNylasSignature(req) {
  const signature = req.headers["x-nylas-signature"];
  const digest = crypto
    .createHmac("sha256", process.env.CLIENT_SECRET)
    .update(req.rawBody)
    .digest("hex");

  return digest === signature;
}

export default router;
