const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("queries", querySchema);
