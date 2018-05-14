<template>

  <div>
    <table>
      <tr>
        <th width="200px;">知识分类</th>
        <th width="600px;">归集知识</th>
        <th>
          知识案例
          <el-button class="right" @click="dialogVisible = true" type="text"><span @click="detail">识别详情</span></el-button>
        </th>
      </tr>
      <tr>
        <td>
          <span class="title">招标代理</span>
          <p>
            <el-checkbox v-model="checked1">招标文件</el-checkbox>
          </p>
          <p>
            <el-checkbox v-model="checked2">合同范本</el-checkbox>
          </p>
          <span class="title">工程咨询</span>
          <p>
            <el-checkbox v-model="checked3">可行性研究</el-checkbox>
          </p>
        </td>
        <td>
          <p>
            <span class="title">相似度</span>
            <el-input v-model="similarDegree" placeholder="请输入内容"></el-input>
            （相似度=匹配文字/最小段落字数）
          </p>
          <p>
            <span class="title">段落</span>
            <el-input v-model="targetLength" placeholder="请输入内容"></el-input>
            （设置匹配结果的最小段落长度）
          </p>
          <p>
            <span class="title">检索方式</span>
            <el-radio v-model="radio" label="1">文本</el-radio>
            <el-radio v-model="radio" label="2">文档</el-radio>
          </p>
          <p v-if="radio == 1">
            <span class="title">文本</span>
            <textarea v-model="searchTxt" rows="6" cols="40" style="resize: none;"></textarea>
          </p>
          <p v-if="radio == 2">
            <span class="title">文档</span>
          </p>
          <p>
            <el-button type="primary" round @click="check">检索</el-button>
            <el-button round>取消</el-button>
          </p>
        </td>
        <td>

        </td>
      </tr>
    </table>

    <el-dialog
      title="识别结果"
      :visible.sync="dialogVisible"
      width="80%" :before-close="handleClose">



      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: 'Check',
    data () {
      return {
        radio: '1',//1:文本，2：文档
        similarDegree: '',
        targetLength: '',
        searchTxt: '',
        checked1:'',
        checked2:'',
        checked3:'',
        dialogFormVisible: false,
        dialogVisible: false
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      },
      check:function(){
        if(this.radio == 1){//文本
          this.$http.post('http://192.168.0.2:18885/mock/45/search/searchingIndex', {
            similarDegree: this.similarDegree,
            targetLength: this.targetLength,
            searchTxt: this.searchTxt,
            searchIngType: 'txt'
          })
          .then((response) => {
            console.log(response);
          })
        }else if(this.radio == 2){//文档
          // this.$http.post('http://192.168.0.2:18885/mock/45/search/searchingIndex', {
          //   similarDegree: this.similarDegree,
          //   targetLength: this.targetLength,
          //   searchTxt: '',
          //   searchIngType: '',
          //   searchFile:
          // })
          // .then((response) => {
          //   console.log(response);
          // })
        }

      },
      detail:function(){
        this.$http.post('http://192.168.0.2:18885/mock/45/search/searchDetails', {
          searchId: 2
        })
        .then((response) => {
          console.log(response);
        })
      }
    }
  }
</script>

<style scoped>
  .right{
    float: right;
  }
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
  table{
    width: 100%;
    border-collapse:collapse;
    border: aliceblue;
    background: #FFF;
    line-height: 31px;
    font-size: 14px;
  }
  th,td{
    border: 1px solid #ebebeb;
    padding: 5px;
  }
  th{
    color: #909399;
  }
  td{
    color: #606266;
  }
  p{
    margin-bottom: 5px;
  }
</style>
