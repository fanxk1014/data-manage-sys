<template>
  <div>
    <el-input placeholder="输入文档名称或文本内容模糊查询" v-model="value" class="input-with-select">
      <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
    </el-input>
    <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column
        prop="id"
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
            @click="handleEdit(scope.$index, scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  export default {
    name: 'History',
    data() {
      return {
        tableData: [],
        value: ''
      }
    },
    methods: {
      search: function(){

        this.axios({
          url: 'http://192.168.0.2:49003/nlp/search/searchHistory/',
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
            this.tableData = response.data.data.content;
          })
          .catch((response) => {
            console.log(response);
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
</style>
