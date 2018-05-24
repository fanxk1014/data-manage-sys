<template>

  <div>
    <table>
      <tr>
        <th width="200px;">知识分类</th>
        <th width="500px;">归集知识</th>
        <th>
          知识案例
          <el-button class="right" @click="dialogVisible = true" type="text">
            识别详情
          </el-button>
        </th>
      </tr>
      <tr>
        <td>
          <el-tree id="checkType"
            :data="treeData"
            :props="props"
            show-checkbox
            default-expand-all
            check-strictly
            @check-change="handleCheckChange">
          </el-tree>
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
              :name="fileName"
              :action="url"
              :data="checkData"
              :on-exceed="handleExceed"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :on-success="loadSuccess"
              :on-error="loadFail"
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
            v-loading="loading"
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
              width="100">
            </el-table-column>
          </el-table>

        </td>
      </tr>
    </table>

    <el-dialog id="dialog1"
      title="识别结果"
      :visible.sync="dialogVisible"
      width="99%" :before-close="handleClose">

      <detail :checkId="searchId" :idType="1"></detail>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import detail from '../detail/Detail'
  import Global from '@/components/Global/Global'
  export default {
    name: 'Check',
    data () {
      return {
        loading: false,
        radio: '1',//1:文本，2：文档
        similarDegree: '',
        targetLength: '',
        searchTxt: '',
        searchIngType: '',
        searchFile: '',
        typeArr:[],//知识分类
        typeString:'',//知识分类-向后台传参用string格式
        dialogFormVisible: false,
        dialogVisible: false,
        fileList: [],
        tableData: [],
        fileName: 'searchFile',
        searchId: '',
        url:Global.address+'/search/searchingIndex',
        treeData:[],
        props: {
          label: 'name',
          children: 'children'
        },
        checkData:{//识别-随文档所传参数
          similarDegree: '',
          targetLength: '',
          searchIngType: '',
          searchIngType: '',
          treeId: ''
        }
      }
    },
    components: {
      detail: detail
    },
    mounted:function(){
      this.axios({
        url: Global.address+'/tree/getTree',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response) => {
          this.treeData = response.data.data
        })
        .catch((response) => {
        });
    },
    methods: {
      handleClose(done) {
        done();
      },
      handleCheckChange(data, checked) {
        if(checked == true){
          this.typeArr.push(data.id)
        }else if(checked == false){
          if (this.typeArr.indexOf(data.id) > -1) {
            this.typeArr.splice(this.typeArr.indexOf(data.id), 1);
          }
        }
      },
      check:function(){
        this.typeString = this.typeArr.join(',');
        if(this.radio == 1){//文本
          this.loading = true;
          this.axios({
            url: Global.address+'/search/searchingIndex',
            method: 'post',
            data: {
              similarDegree: this.similarDegree,
              targetLength: this.targetLength,
              searchTxt: this.searchTxt,
              searchIngType: 'txt',
              treeId: this.typeString
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
              this.loading = false
            })
            .catch((response) => {
              this.loading = false
            });

        }else if(this.radio == 2){//文档
          this.checkData.similarDegree = this.similarDegree;
          this.checkData.targetLength = this.targetLength;
          this.loading = true;
          this.checkData.treeId = this.typeString;
          this.$refs.upload.submit();
          this.loading = false
        }

      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeUpload(file) {
        this.checkData.searchIngType = file.name.substring(file.name.lastIndexOf(".")+1,file.name.length);//后缀名
      },
      loadSuccess(response, file, fileList){
        this.$message({
          message: '检索成功',
          type: 'success'
        });
        this.searchId = response.data.searchingMainId;
        this.tableData = response.data.searchingList;
      },
      loadFail(){
        this.$message({
          showClose: true,
          message: '检索失败',
          type: 'error'
        });
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
