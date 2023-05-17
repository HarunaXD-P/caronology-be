module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const yearTable = new Schema({
    yearId: { type: String },
    yearInfo: { type: String },
    yearText: { type: String },
    yearOld: { type: String },
    fileId: { type: String },

  });
  return mongoose.model("yearTableModel", yearTable, "yearTable")
}