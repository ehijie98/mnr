import express from "express";
import cors from "cors";

import { connectClient } from "./db";

const router = express.Router();

// middleware
router.use(cors());
router.use(express.json());

router.get("/contests", async (req, res) => {
  // get the data from MongoDB
  const client = await connectClient();

  const contests = await client
    .collection("contests")
    .find()
    .project({
      id: 1,
      categoryName: 1,
      contestName: 1,
      _id: 0,
    })
    .toArray();
  res.send({ contests });
});

router.get("/contest/:contestId", async (req, res) => {
  const client = await connectClient();

  const contest = await client
    .collection("contests")
    .findOne({ id: req.params.contestId });

  res.send({ contest });
});

router.post("/contest/:contestId", async (req, res) => {
  const client = await connectClient();

  const { newNameValue } = req.body;

  const updatedContest = await client
    .collection("contests")
    .findOneAndUpdate(
      { id: req.params.contestId },
      {
        $push: {
          names: {
            id: newNameValue.toLowerCase().replace(/\s/g, "-"),
            name: newNameValue,
            timestamp: new Date(),
          },
        },
      },
      { returnDocument: "after" },
    );

  res.send({ updatedContest });
});

router.post("/contests", async (req, res) => {
  const client = await connectClient();

  const {contestName, categoryName, description} = req.body;

  const updatedContestList = await client
    .collection("contests")
    .insertOne({
      id: contestName.toLowerCase().replace(/\s/g, "-"),
      contestName,
      categoryName,
      description,
      names: [],
    });

    const newContest = await client
      .collection("contests")
      .findOne({_id: updatedContestList.insertedId});

    res.send({newContest})

})

export default router;
