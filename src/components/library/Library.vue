<template>
  <div>
    <el-input placeholder="输入文档名称模糊查询" v-model="fileName" class="input-with-select">
      <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="primary" @click="dialogVisible = true">新增知识库</el-button>
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
        label="索引类型"
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

    <el-dialog
      title="新增知识库"
      :visible.sync="dialogVisible"
      width="30%" :before-close="handleClose">

      <!--<el-treeselect-->
        <!--multiple-->
        <!--v-model="title"-->
        <!--:remoteSearch="true"-->
        <!--placeholder="请输入搜索内容"-->
        <!--:data="treeData"-->
        <!--:props="props"-->
        <!--:isEdit="true"-->
        <!--:clickParent="true"-->
        <!--:disabled="true"-->
        <!--:renderContent=""-->
        <!--@treeSearch="searchFun"-->
        <!--@nodeClick="nodeClick"-->
        <!--@treeNodeCheckFun="treeNodeCheckFun"-->
        <!--@show="showFun"-->
        <!--@hide="function(val){hideMdataFun(scope.row,val)}"-->
      <!--&gt;-->
      <!--</el-treeselect>-->

      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  import elTreeselect from 'el-tree-select';
  export default {
    name: 'Library',
    data() {
      return {
        fileName: '',
        tableData: [],
        options: [{
          label: '招标代理',
          options: [{
            value: 'Shanghai',
            label: '招标文件'
          }, {
            value: 'Beijing',
            label: '合同范本'
          }]
        }, {
          label: '工程咨询',
          options: [{
            value: 'Chengdu',
            label: '可行性研究'
          }]
        }],
        value: '请选择知识库类型',
        fileList: [
          {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
        ],
        dialogFormVisible: false,
        dialogVisible: false,
        title: 'test',
        treeData: [{flowId: 1, name: '123'}],
        props: {
          label: 'name',
          value: 'flowId'
        }
      }
    },
    components: {elTreeselect},
    methods: {
      handleClose(done) {
        done();
      },
      search:function(){
        this.axios({
          url: 'http://192.168.0.2:49003/nlp/doc/searchDocument/',
          method: 'post',
          data: {
            page: 1,
            size: 5,
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
            this.tableData = response.data.data.content;
          })
          .catch((response) => {
            console.log(response);
          });
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
      },

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
  .el-select{
    margin-bottom: 10px;
  }
</style>
