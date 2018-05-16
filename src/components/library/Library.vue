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
      width="30%" :before-close="handleClose">

      <el-autocomplete
        popper-class="my-autocomplete"
        v-model="state3"
        :fetch-suggestions="querySearch"
        placeholder="请输入内容"
        @select="handleSelect">
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
          @click="handleIconClick">
        </i>
        <template slot-scope="{ item }">
          <!--<div class="first">{{ item.name }}</div>-->

          <div class="sec">{{item.children[0].name}}</div>
          <!--<div class="sec">{{item.children[1].name}}</div>-->
          <!--<div v-if="item.children" class="sec">{{item.children[1].name}}</div>-->
        </template>
      </el-autocomplete>

      <!--<el-tree-->
        <!--:data="selArr"-->
        <!--show-checkbox-->
        <!--node-key="id"-->
        <!--:default-expanded-keys="[2, 3]"-->
        <!--:default-checked-keys="[5]"-->
        <!--:props="defaultProps">-->
      <!--</el-tree>-->

      <el-upload
        class="upload-demo"
        ref="upload" multiple
        :action="url"
        :data="data"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">文件不超过500kb</div>
      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">上 传</el-button>
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
        title: '请选择知识库类型',
        fileName: '',
        tableData: [],
        fileList: [],
        dialogFormVisible: false,
        dialogVisible: false,
        selArr: [],
        restaurants: [],
        file: '',
        state3: '',
        data:{treeId:1},
        url:"http://192.168.0.2:49003/nlp/doc/upload/",
        currentPage: 1,
        totalItems: ''
      }
    },
    methods: {
      openDialog:function(){
        this.restaurants = this.loadAll();
      },
      handleClose(done) {
        done();
      },
      search:function(){
        this.axios({
          url: 'http://192.168.0.2:49003/nlp/doc/searchDocument/',
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
            console.log(response.data.data.content);
          })
          .catch((response) => {
            console.log(response);
          });
      },
      submitUpload() {
        this.$refs.upload.submit();
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
      getFile($event){
        this.file = $event.target.files[0] //获取要上传的文件
        console.log(this.file);
      },

      // 知识库类型tree选择器
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant);
        };
      },
      loadAll() {
        // console.log('loadAll:',this.selArr);
        return this.selArr;
      },
      handleSelect(item) {
        this.state3 = item.children[0].name
        console.log(item.children[0].name);
      },
      handleIconClick(ev) {//点击sel图标
        // console.log(ev);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.axios({
          url: 'http://192.168.0.2:49003/nlp/doc/searchDocument/',
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
            this.searchStatus = true;
          })
          .catch((response) => {
            console.log(response);
          });
      }

    },
    mounted:function(){

      this.axios({
        url: 'http://192.168.0.2:49003/nlp/tree/getTree',
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response) => {
          this.selArr = response.data.data;
        })
        .catch((response) => {
          console.log(response);
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
  .el-select{
    margin-bottom: 10px;
  }

  #sel-tree{
    width: 200px;
    height: 150px;
    overflow: auto;
    border: 1px solid #e4e7ed;
  }
  .my-autocomplete li {
    line-height: normal;
    padding: 7px;
  }
  .my-autocomplete .first {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .my-autocomplete .sec {
    margin-left: 10px;
  }
  .my-autocomplete .highlighted .addr {
    color: #ddd;
  }

</style>
