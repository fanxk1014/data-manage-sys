<template>
  <div>
    <el-input placeholder="输入文档名称模糊查询" v-model="fileName" class="input-with-select">
      <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="primary" @click="dialogVisible = true">新增知识库</el-button>
{{this.tableData}}
    <el-table ref="multipleTable" border :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column
        label="序号"
        width="120">
        <!--<template slot-scope="scope">{{ scope.row.date }}</template>-->
      </el-table-column>
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
        prop="address"
        label="文件类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="知识类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="索引类型"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="索引时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>

    <el-dialog
      title="新增知识库"
      :visible.sync="dialogVisible"
      width="30%" :before-close="handleClose">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
  export default {
    name: 'Library',
    data() {
      return {
        fileName: '',
        tableData:[],
        options: [{
          value: '',
          label: ''
        }, {
          value: '',
          label: ''
        }],
        value: '',
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
      search:function(){
        this.$http.post('http://192.168.0.2:18885/mock/45/doc/searchDocument/', {
          page: 0,
          size: 3,
          fileName: this.fileName,
        })
          .then(function (response) {
            console.log(response.data.data.content);
            // this.set(data.tableData,response.data.data.content)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
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
</style>
