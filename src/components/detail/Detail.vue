<template>
  <div>
    <div >
      <span class="title">知识列表</span>
      <el-table
        :data="tableData" border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="相似文献列表"
          width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-html="scope.row.fileName"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="相似度"
          width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-html="scope.row.similarDegree"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="疑似剽窃观点"
          width="">
          <template slot-scope="scope">
            <!--<span style="margin-left: 10px" v-html="scope.row.similarDegree"></span>-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <br>
    <div>
      <span class="title">内容对比</span>
      <el-table
        :data="tableData" border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="原文内容"
          width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-html="scope.row.sourceContent"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="相似内容来源"
          width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-html="scope.row.targetContent"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data () {
      return {
        tableData:[],
        searchId:''
      }
    },
    mounted: function(){
      this.searchId = this.$route.params.searchId;
      this.axios({
        url: 'http://192.168.0.2:49003/nlp/search/searchDetails',
        method: 'get',
        data: {
          searchId: this.$route.params.searchId
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
          console.log('detail:',this.$route.params.searchId,response.data.data.searchingList);
          this.tableData = response.data.data.searchingList;
        })
        .catch((response) => {
          console.log(response);
        });
    },
    deactivated () {
      this.$destroy()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
  #btnNav{
    margin-bottom: 10px;
  }
  .title{
    font-weight: 600;
    font-size: 16px;
  }
  #dialog1 .el-dialog__body,
  #dialog2 .el-dialog__body{
    height: 500px;
    overflow: auto;
  }
</style>
