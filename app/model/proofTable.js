module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const proofTable = new Schema({
    proofId: { type: String },
    proofInfo: { type: String },
    proofText: { type: String },
    proofType: { type: String },
    eventId: { type: String },
  });
  return mongoose.model("proofTableModel", proofTable, "proofTable")
}