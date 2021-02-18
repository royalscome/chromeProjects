<template>
  <div class="container">
    <div class="tips">
      目前仅支持播放B站视频！！！输入框内不输入内容则清空数据。输入内容仅限B站视频分享按钮下嵌入代码选项中src部分内容！！！
    </div>
    <div class="example">
      举个栗子：{{ code }},src单引号中的内容就是我们要输入的内容
    </div>
    <el-input
      placeholder="请输入内容"
      v-model="inputValue"
      clearable
      class="input"
    >
    </el-input>
    <div class="button">
      <el-button type="danger">取消修改</el-button>
      <el-button type="primary" @click="handleChange">确认修改</el-button>
    </div>
    <div class="choose">
      <div class="text">是否展示广告窗:</div>
      <el-radio v-model="radio" label="1" @change="handleChoose">是</el-radio>
      <el-radio v-model="radio" label="2" @change="handleChoose">否</el-radio>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      radio: "1",
      code:
        "<iframe src='//player.bilibili.com/player.html?aid=629201688&bvid=BV1fb4y197kR&cid=297194722&page=1' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'> </iframe>",
    };
  },
  mounted(){
    chrome.storage.sync.get(["showBilibili"],(item)=>{
      if(item.showBilibili){
        this.radio = item.showBilibili
      }
    })
  },
  methods: {
    handleChange() {
      chrome.storage.sync.set({ bilibiliUrl: this.inputValue }, () => {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      });
    },
    handleChoose(e){
      console.log(e)
      chrome.storage.sync.set({showBilibili:e},()=>{
        this.$message({
          message: "修改成功",
          type: "success",
        });
      })
    }
  },
};
</script>

<style>
.container {
  padding: 20px;
}
.input {
  width: 800px;
}
.button {
  margin-top: 20px;
}
.example {
  margin-top: 30px;
  margin-bottom: 30px;
}
.choose{
  margin-top: 30px;
}
.choose .text{
  margin-bottom: 20px;
}
</style>