const Service = require("egg").Service;
class eventService extends Service {
  async AddFileRecord(obj) {
    const { ctx } = this;
    const eventList = new ctx.model.EventTable({
      eventId: obj.eventId,
      eventInfo: obj.eventInfo,
      eventText: obj.eventText,
      eventType: obj.eventType,
      yearId: obj.yearId,
    });
    eventList.save();
    return "添加成功"
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