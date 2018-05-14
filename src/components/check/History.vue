<template>
  <div>
    <el-input placeholder="输入文档名称或文本内容模糊查询" class="input-with-select">
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column
        label="序号"
        width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="文件名/文本内容">
      </el-table-column>
      <el-table-column
        prop="address"
        label="识别时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="文件类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
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
