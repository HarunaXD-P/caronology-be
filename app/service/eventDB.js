const Service = require("egg").Service;
var md5 = require("md5");
class eventService extends Service {
  async AddEventRecord(obj) {
    const { ctx } = this;
    let eventId = md5(obj.eventText.slice(0, 128) + toString(Date.now()))
    const eventList = new ctx.model.EventTable({
      eventId,
      eventInfo: obj.eventInfo,
      eventText: obj.eventText,
      eventType: obj.eventType,
      yearId: obj.yearId,
    });
    eventList.save();
    return { eventId }
  }
  async FindEventRecord(obj) {
    const { ctx } = this;
    const res = await ctx.model.EventTable.find(obj);
    return res
  }
  async ModifyEventRecord(query, target) {
    const { ctx } = this;
    let res = await ctx.model.EventTable.findOneAndUpdate(query, target, function (err, data) {
      if (err) {
        return "修改失败"
      } else {
        return "修改成功"
      }
    })
    return res
  }
  async DeleteEventRecord(query) {
    const { ctx } = this;
    let res = await ctx.model.EventTable.deleteOne(query, function (err, data) {
      if (err) {
        return "删除失败"
      } else {
        return "删除成功"
      }
    })
    return res
  }

}
module.exports = eventService;