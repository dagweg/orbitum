import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  privacy: {},
  appeareance: {},
  notifications: {},
  security: {},
});

export const Settings = mongoose.model("Settings", settingsSchema);
