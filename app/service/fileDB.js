const Service = require("egg").Service;
class fileService extends Service {
  async AddFileRecord(obj) {
    const { ctx } = this;
    //注意！！！！ctx.model.xxx中xxx指的是model的文件名首字母大写
    const fileList = new ctx.model.FileTable({
      fileId: obj.fileId,
      fileName: obj.fileName,
      fileLocation: obj.fileLocation,
      fileProtagonist: obj.fileProtagonist,
      fileStatus: 0
    });
    // 数据保存到数据库
    fileList.save();
    return "添加成功"
  }
  async FindFileRecord(obj) {
    const { ctx } = this;
    const res = await ctx.model.FileTable.find(obj);
    return res
  }
  async ModifyFileRecord(query, target) {
    const { ctx } = this;
    let res = await ctx.model.FileTable.findOneAndUpdate(query, target, function (err, data) {
      if (err) {
        return "修改失败"
      } else {
        return "修改成功"
      }
    })
    return res
  }
  async DeleteFileRecord(query) {
    const { ctx } = this;
    let res = await ctx.model.FileTable.deleteOne(query, function (err, data) {
      if (err) {
        return "删除失败"
      } else {
        return "删除成功"
      }
    })
    return res
  }

}
module.exports = fileService;