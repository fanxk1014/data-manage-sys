<template>
  <div>
    <div >
      <!--{{checkId}}-{{historyId}}-type{{idType}}-->
      <!--<button @click="show">btn</button>-->
      <span class="title">知识列表</span>
      <el-table
        :data="tableData" border
        v-loading="loading"
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
        v-loading="loading"
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
  import Global from '@/components/Global/Global'
  export default {
    name: 'detail',
    data () {
      return {
        tableData:[],
        searchId:'',
        loading: false
      }
    },
    methods:{

    },
    mounted:function(){
      if(this.$props.idType == 1){
        this.searchId = this.$props.checkId
      }else if(this.$props.idType == 2){
        this.searchId = this.$props.historyId
      }
      if(this.searchId){
        this.loading = true
        this.axios({
          url: Global.address+'/search/searchDetails?searchId='+this.searchId,
          method: 'get',
          data: {
            searchId: this.searchId
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
            this.tableData = [];
            this.tableData = response.data.data.searchingList;
            this.loading = false
          })
          .catch((response) => {
            // console.log('error');
            this.tableData = [];
            this.loading = false
          });
      }

    },
    watch: {
      searchId (val, oldval) {
        if(this.$props.checkId){
          this.searchId = this.$props.checkId;
        }else if(this.$props.historyId) {
          this.searchId = this.$props.historyId;
        }

        if(this.searchId) {
          this.loading = true
          this.axios({
            url: Global.address+'/search/searchDetails?searchId=' + this.searchId,
            method: 'get',
            data: {
              searchId: this.searchId
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
              this.tableData = [];
              this.tableData = response.data.data.searchingList;
              this.loading = false
            })
            .catch((response) => {
              // console.log('error');
              this.tableData = [];
              this.loading = false
            });
        }
      },
      ['checkId'] (val, oldval) {
        // console.log('checkId改变：',val)
        this.searchId = this.$props.checkId;
        if(this.searchId) {
          this.loading = true
          this.axios({
            url: Global.address+'/search/searchDetails?searchId=' + this.searchId,
            method: 'get',
            data: {
              searchId: this.searchId
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
              this.tableData = [];
              this.tableData = response.data.data.searchingList;
              this.loading = false
            })
            .catch((response) => {
              // console.log('error');
              this.tableData = [];
              this.loading = false
            });
        }
      },
      ['historyId'](val, oldval) {
        // console.log('historyId改变：',val,oldval)
        this.searchId = this.$props.historyId;
        this.loading = true
        this.axios({
          url: Global.address+'/search/searchDetails?searchId='+this.searchId,
          method: 'get',
          data: {
            searchId: this.searchId
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
            this.tableData = [];
            this.tableData = response.data.data.searchingList;
            this.loading = false
          })
          .catch((response) => {
            // console.log('error');
            this.tableData = [];
            this.loading = false
          });
      }
    },
    props:['checkId','historyId','idType']
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
