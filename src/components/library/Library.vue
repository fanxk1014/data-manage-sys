<template>
  <div>
    <el-input placeholder="输入文档名称模糊查询" v-model="fileName" class="input-with-select">
      <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="primary" @click="dialogVisible = true;openDialog()">新增知识库</el-button>
    <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column
        prop="fileName"
        label="文件名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="来源"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="fileType"
        label="文件类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="field_7"
        label="知识类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="indexingType"
        label="知识库类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="indexingTime"
        label="索引时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <el-pagination v-if="tableData != ''"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page.sync="currentPage"
                   :page-size="10"
                   layout="total, prev, pager, next"
                   :total="totalItems">
    </el-pagination>

    <el-dialog
      title="新增知识库"
      :visible.sync="dialogVisible"
      width="30%" style="margin-top: 15vh" :before-close="handleClose">

      <div id="sel-tree">
        <el-tree
          :data="selArr"
          show-checkbox
          node-key="id"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
          :props="defaultProps">
        </el-tree>
      </div>

      <el-upload
        class="upload-demo"
        ref="upload"
        :action="url"
        :data="uploadData"
        :multiple="false"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        :on-success="loadSuccess"
        :on-error="loadFail"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">1. 目前支持doc、docx、zip格式文件上传</div>
        <div slot="tip" class="el-upload__tip">2. ZIP文件会读取里面的文档信息</div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">上 传</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import elTreeselect from 'el-tree-select'
  import Global from '@/components/Global/Global'
  export default {
    name: 'Library',
    data() {
      return {
        title: '请选择知识库类型',
        fileName: '',
        tableData: [],
        fileList: [],
        dialogFormVisible: false,
        dialogVisible: false,
        selArr: [],
        inputSel:'',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        restaurants: [],
        file: '',
        uploadData:{treeId:''},
        url:Global.address+"/doc/upload/",
        currentPage: 1,
        totalItems: ''
      }
    },
    methods: {
      openDialog:function(){

      },
      handleClose(done) {
        done();
      },
      search:function(){

        this.axios({
          url: Global.address+'/doc/searchDocument/',
          method: 'post',
          data: {
            page: 0,
            size: 10,
            fileName: this.fileName,
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
            this.totalItems = response.data.data.totalElements;
            this.tableData = response.data.data.content;
            // console.log(response.data.data.content);
          })
          .catch((response) => {
            // console.log(response);
          });
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      getFile($event){
        this.file = $event.target.files[0] //获取要上传的文件
        // console.log(this.file);
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loading = true
        this.axios({
          url: Global.address+'/doc/searchDocument/',
          method: 'post',
          data: {
            fileName: this.fileName,
            page: this.currentPage-1,
            size: 10
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
            this.totalItems = response.data.data.totalElements;
            this.tableData = response.data.data.content;
            this.searchStatus = false;
          })
          .catch((response) => {
            // console.log(response);
            this.searchStatus = false;
          });
      },
      beforeUpload(file) {
        this.uploadData.treeId = file.name.substring(file.name.lastIndexOf(".")+1,file.name.length);//后缀名
      },
      loadSuccess(response, file, fileList){
        this.$message({
          message: '上传成功',
          type: 'success'
        });
      },
      loadFail(){
        this.$message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        });
      },
      handleNodeClick(data) {
        // console.log(data);
      },
      handleCheckChange(data, checked, indeterminate) {

        if(checked == true){
          // console.log(data.id);
        }
      },
    },
    mounted:function(){
      this.loading = true
      this.axios({
        url: Global.address+'/doc/searchDocument/',
        method: 'post',
        data: {
          page: 0,
          size: 10,
          fileName: '',
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
          this.totalItems = response.data.data.totalElements;
          this.tableData = response.data.data.content;
          this.loading = false
        })
        .catch((response) => {
          this.loading = false
        });

      this.axios({
        url: Global.address+'/tree/getTree',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response) => {
          // console.log(response.data.data);
          this.selArr = response.data.data
        })
        .catch((response) => {
          this.loading = false
        });
    }
  }
</script>

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
  .input-with-select{
    width: 300px;
    margin-bottom: 10px;
  }
  .upload-demo,#file{
    margin-top: 10px;
  }
  #sel-tree{
    width: 200px;
    height: 150px;
    overflow: auto;
    border: 1px solid #e4e7ed;
  }
</style>
