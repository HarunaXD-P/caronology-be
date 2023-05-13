const Service = require("egg").Service;
class relationService extends Service {
  async AddRelationRecord(obj) {
    const { ctx } = this;
    const relationList = new ctx.model.RelationTable({
      relationId: obj.relationId,
      relationInfo: obj.relationInfo,
      relationText: obj.relationText,
      relationType: obj.relationType,
      fileId: obj.fileId,
    });
    relationList.save();
    return "添加成功"
  }
  async FindRelationRecord(obj) {
    const { ctx } = this;
    const res = await ctx.model.RelationTable.find(obj);
    return res
  }
  async ModifyRelationRecord(query, target) {
    const { ctx } = this;
    let res = await ctx.model.RelationTable.findOneAndUpdate(query, target, function (err, data) {
      if (err) {
        return "修改失败"
      } else {
        return "修改成功"
      }
    })
    return res
  }
  async DeleteRelationRecord(query) {
    const { ctx } = this;
    let res = await ctx.model.RelationTable.deleteOne(query, function (err, data) {
      if (err) {
        return "删除失败"
      } else {
        return "删除成功"
      }
    })
    return res
  }

}
module.exports = relationService;