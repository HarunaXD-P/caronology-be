const Service = require("egg").Service;
class yearService extends Service {
  async AddYearRecord(obj) {
    const { ctx } = this;
    const yearList = new ctx.model.YearTable({
      yearId: obj.yearId,
      yearInfo: obj.yearInfo,
      yearText: obj.yearText,
      yearOld: obj.yearOld,
      fileId: obj.fileId,
    });
    yearList.save();
    return "添加成功"
  }
  async FindYearRecord(obj) {
    const { ctx } = this;
    const res = await ctx.model.YearTable.find(obj);
    return res
  }
  async ModifyYearRecord(query, target) {
    const { ctx } = this;
    let res = await ctx.model.YearTable.findOneAndUpdate(query, target, function (err, data) {
      if (err) {
        return "修改失败"
      } else {
        return "修改成功"
      }
    })
    return res
  }
  async DeleteYearRecord(query) {
    const { ctx } = this;
    let res = await ctx.model.YearTable.deleteOne(query, function (err, data) {
      if (err) {
        return "删除失败"
      } else {
        return "删除成功"
      }
    })
    return res
  }

}
module.exports = yearService;