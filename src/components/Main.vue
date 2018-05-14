<template>

  <div>
    <el-row>
      <div class="tips" v-if="show">
        温馨提示：请选择需要识别的知识分类后，新增或导入需要归集的知识文本，开始智能识别。点击清空当前后，当前识别内容将进入识别历史。
      </div>
    </el-row>
    <el-button-group id="btnNav">
      <router-link to="/"><el-button type="primary">我要识别</el-button></router-link>
      <router-link to="/history"><el-button type="primary">识别历史</el-button></router-link>
      <router-link to="/library"><el-button type="primary">知识库</el-button></router-link>
    </el-button-group>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      show:true,
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  #btnNav{
    margin-bottom: 10px;
  }
</style>
