module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const fileTable = new Schema({
    fileId: { type: String },
    fileName: {type: String },
    fileLocation: { type: String },
    fileProtagonist: {type: String },
    fileStatus: { type: Number }

  });
  return mongoose.model("fileTableModel", fileTable, "fileTable")
}