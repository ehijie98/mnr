import express from "express";
import cors from "cors";

import { connectClient } from "./db";

const router = express.Router();
router.use(cors());

router.get("/contests", async (req, res) => {
  // get the data from MongoDB
  const client = await connectClient();

  const contestsArray = await client
    .collection("contests")
    .find()
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1,
    })
    .toArray();
  res.send({ contests: contestsArray });
});

// router.get("/contest")

export default router;
