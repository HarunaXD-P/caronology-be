module.exports = app => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const eventTable = new Schema({
    eventId: { type: String },
    eventInfo: { type: String },
    eventText: { type: String },
    eventType: { type: String },
    yearId: { type: String },

  });
  return mongoose.model("eventTableModel", eventTable, "eventTable")
}