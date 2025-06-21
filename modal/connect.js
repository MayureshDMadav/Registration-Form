const mongoose = require("mongoose");
const encrption = require("mongoose-encryption");
require("dotenv").config();

mongoose.connect(process.env.DB_URL);

const userFormSchema = new mongoose.Schema({
  emailId: String,
  password: String,
});

userFormSchema.plugin(encrption, {
  secret: process.env.secrets,
  encryptedFields: ["password"],
});

module.exports = mongoose.model("registration", userFormSchema);
