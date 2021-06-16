const mongoose = require("mongoose");

const nowUnix = () => Date.now();
const unixToString = (unix) => {
  const d = new Date(unix);
  return `${d.getDate().toString().padStart(2, "0")}-${d
    .getMonth()
    .toString()
    .padStart(2, "0")}-${d.getFullYear()}`;
};

const IssueSchema = new mongoose.Schema({
  title: String,
  description: String,
  projectName: String,
  priority: Number,
  createdOn: {
    type: Number,
    default: nowUnix,
  },
  updatedOn: {
    type: Number,
    default: nowUnix,
  },
});

IssueSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

IssueSchema.virtual("timestamps").get(function () {
  console.log(this);
  return {
    createdOn: unixToString(this.createdOn),
    updatedOn: unixToString(this.updatedOn),
  };
});

// Ensure virtual fields are serialised.
IssueSchema.set("toJSON", {
  virtuals: true,
});

const IssueModel = mongoose.model("Issue", IssueSchema);

module.exports = IssueModel;
