const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const IssueModel = require("./model");

mongoose.connect("mongodb://localhost:27017/isssueAppDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("hurray connected to db");
});

const app = express();
const port = 7000;

app.use(express.json());
app.use(cors());

app.get("/issue", async (req, res) => {
  const issues = await IssueModel.find();
  res.json(issues);
});

app.get("/issue/:id", async (req, res) => {
  const issue = await IssueModel.findOne({ _id: req.params.id });
  res.json(issue);
});

app.post("/issue", async (req, res) => {
  delete req.body.id;
  delete req.body.timestamps;
  const issue = new IssueModel(req.body);
  await issue.save();
  res.json(issue);
});

app.put("/issue/:id", async (req, res) => {
  delete req.body.timestamps;
  const issue = await IssueModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      ...req.body,
      updatedOn: Date.now(),
    },
    {
      new: true,
    }
  );
  res.status(200).json(issue);
});

app.delete("/issue/:id", async (req, res) => {
  await IssueModel.deleteOne({ _id: req.params.id });
  res.json(200);
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
