module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const relationTable = new Schema({
    relationId: { type: String },
    relationInfo: { type: String },
    relationText: { type: String },
    relationType: { type: String },
    fileId: { type: String },

  });
  return mongoose.model("relationTableModel", relationTable, "relationTable")
}