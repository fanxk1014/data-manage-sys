<template>

  <div>
    <table>
      <tr>
        <th width="200px;">知识分类</th>
        <th width="500px;">归集知识</th>
        <th>
          知识案例
          <el-button class="right" @click="dialogVisible = true" type="text">
            <router-link :to="{name:'detail',params:{username:'222',searchId:searchId,radio:radio}}">
              识别详情
            </router-link>
          </el-button>
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
            <el-upload
              class="upload-demo"
              ref="upload" multiple
              :action="url"
              :data="data2"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">文件不超过500kb</div>
            </el-upload>
          </p>
          <p>
            <el-button type="primary" round @click="check">检索</el-button>
            <el-button round>取消</el-button>
          </p>
        </td>
        <td>

          <el-table
            :data="tableData"
            style="width: 100%" height="450">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="fileName"
              label="文件名"
              width="">
            </el-table-column>
            <el-table-column
              prop="similarDegree"
              label="匹配度"
              width="">
            </el-table-column>
            <el-table-column
              label="相似内容"
              width=""
              prop="similarContent">
            </el-table-column>
          </el-table>

        </td>
      </tr>
    </table>

    <el-dialog id="dialog1"
      title="识别结果"
      :visible.sync="dialogVisible"
      width="80%" :before-close="handleClose">

        <router-view></router-view>

      <span slot="footer" class="dialog-footer">
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
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
        searchIngType: '',
        searchFile: '',
        checked1:'',
        checked2:'',
        checked3:'',
        dialogFormVisible: false,
        dialogVisible: false,
        fileList: [],
        tableData: [],
        searchId: '',
        url:'http://192.168.0.2:49003/nlp/search/searchingIndex',
        data2:{
          // similarDegree: this.similarDegree,
          // targetLength: this.targetLength,
          similarDegree: 0.5,
          targetLength: 1,
          searchIngType: 'docx',
          searchTxt: ''
        }
      }
    },
    methods: {
      handleClose(done) {
        done();
      },
      check:function(){
        if(this.radio == 1){//文本

          this.axios({
            url: 'http://192.168.0.2:49003/nlp/search/searchingIndex',
            method: 'post',
            data: {
              // similarDegree: this.similarDegree,
              // targetLength: this.targetLength,
              // searchTxt: this.searchTxt,
              similarDegree: 0.5,
              targetLength: 1,
              searchTxt: '系统',
              searchIngType: 'txt'
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
            .then((response) => {
              this.searchId = response.data.data.searchingMainId;
              this.tableData = response.data.data.searchingList;
            })
            .catch((response) => {
              console.log(response);
            });

        }else if(this.radio == 2){//文档

          this.$refs.upload.submit();

        }

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
    padding: 5px 20px;
  }
  p{
    margin-bottom: 5px;
  }
</style>
