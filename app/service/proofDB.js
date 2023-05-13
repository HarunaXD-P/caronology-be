const Service = require("egg").Service;
class proofService extends Service {
  async AddProofRecord(obj) {
    const { ctx } = this;
    const proofList = new ctx.model.ProofTable({
      proofId: obj.proofId,
      proofInfo: obj.proofInfo,
      proofText: obj.proofText,
      proofType: obj.proofType,
      eventId: obj.eventId,
    });
    proofList.save();
    return "添加成功"
  }
  async FindProofRecord(obj) {
    const { ctx } = this;
    const res = await ctx.model.ProofTable.find(obj);
    return res
  }
  async ModifyProofRecord(query, target) {
    const { ctx } = this;
    let res = await ctx.model.ProofTable.findOneAndUpdate(query, target, function (err, data) {
      if (err) {
        return "修改失败"
      } else {
        return "修改成功"
      }
    })
    return res
  }
  async DeleteProofRecord(query) {
    const { ctx } = this;
    let res = await ctx.model.ProofTable.deleteOne(query, function (err, data) {
      if (err) {
        return "删除失败"
      } else {
        return "删除成功"
      }
    })
    return res
  }

}
module.exports = proofService;