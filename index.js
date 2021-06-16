const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 7000;

app.use(express.json());
app.use(cors());

let issues = [];

app.get("/issue", (req, res) => {
  res.json(issues);
});

app.get("/issue/:id", (req, res) => {
  const id = Number(req.params.id);
  const issue = issues.find((issue) => issue.id === id);
  res.json(issue);
});

app.post("/issue", (req, res) => {
  const issue = req.body;
  const date = new Date();
  issue.createdOn =
    date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  issue.id = Date.now();
  issue.updatedOn = "";
  issues.push(issue);
  res.json(issues);
});

app.put("/issue/:id", (req, res) => {
  const newData = req.body;
  const id = Number(req.params.id);
  console.log(id);
  const date = new Date();
  // issues.forEach(issue => {
  //   if (issue.id === id) {
  //     // issue = { ...issue,...newData, updatedOn: date };
  //     issue=newData;
  //     issue.id=id;
  //     issue.updatedOn=date;
  //     console.log(issue);
  //   }
  // });
  const index = issues.findIndex((issue) => issue.id === id);
  issues[index] = {
    ...issues[index],
    ...newData,
    updatedOn:
      date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear(),
  };
  console.log(issues);

  res.status(200).json(issues);
});

app.delete("/issue/:id", (req, res) => {
  const id = Number(req.params.id);

  issues = issues.filter((issue) => issue.id !== id);
  res.json(200);
});

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
