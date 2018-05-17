<template>
  <div>
    <el-input placeholder="输入文档名称或文本内容模糊查询" v-model="value" class="input-with-select">
      <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
    </el-input>
    <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column
        prop="id" width="50"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="searchContent"
        label="文件名/文本内容">
      </el-table-column>
      <el-table-column
        prop="searchTime"
        label="识别时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="fileType"
        label="文件类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="treeId"
        label="知识类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="" label="操作" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row);dialogVisible = true;">
              <!--<router-link :to="{name:'history/detail',params:{historyId:id}}">-->
                详情
              <!--</router-link>-->
          </el-button>
        </template>
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

    <el-dialog id="dialog2"
      title="详情"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">

      <detail :historyId="id" :idType="2"></detail>

      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </div>

</template>

<script>
  import detail from '../detail/Detail'
  export default {
    name: 'History',
    data() {
      return {
        tableData: [],
        value: '',
        id: '',
        // dialogFormVisible: false,
        dialogVisible: false,
        searchStatus: false,
        currentPage: 1,
        totalItems: ''
      }
    },
    components: {
      detail: detail
    },
    methods: {
      search: function(){
        this.currentPage = 1;
        this.axios({
          url: 'http://192.168.0.2:49003/search/searchHistory/',
          method: 'post',
          data: {
            searchWord: this.value,
            page: 0,
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
            // console.log(response);
          });
      },
      handleEdit(index, row) {
        this.id = row.id
      },
      handleClose(done) {
        done();
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.axios({
          url: '/search/searchHistory/',
          method: 'post',
          data: {
            searchWord: this.value,
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
            // console.log(response);
          });
      }
    },
    mounted: function () {

    },
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
  .el-pagination{
    margin-top: 10px;
  }
</style>
