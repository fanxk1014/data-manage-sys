<template>
  <div>
    <hr>
    <div id="part1">
      <h3 class="title">识别总览</h3>
      <p>
        <span class="item fontRed">总文字复制比：{{copyRate}}</span>
      </p>
      <p>
        <span class="item">单篇最大文字复制比：{{singerMaxCopyRate}}</span>
      </p>
      <table>
        <tr>
          <td>重复字数：</td>
          <td>{{repeatWords}}</td>
          <td>总字数：</td>
          <td>{{totalWords}}</td>
          <td>单篇最大重复字数:</td>
          <td>{{singerMaxRepeatWords}}</td>
        </tr>
        <tr>
          <td>总段落数：</td>
          <td>{{sectionNum}}</td>
          <td>总文字复制比：</td>
          <td>{{copyRate}}</td>
          <td>疑似段落最大重合字数：</td>
          <td>{{similarSectionMaxRepeatWords}}</td>
        </tr>
        <tr>
          <td>疑似段落数：</td>
          <td>{{similarSectionNum}}</td>
          <td>单篇最大文字复制比：</td>
          <td>{{singerMaxCopyRate}}</td>
          <td>疑似段落最小重合字数：</td>
          <td>{{similarSectionMinRepeatWords}}</td>
        </tr>
      </table>

    </div>
    <hr>
    <div id="part2">
      <h3 class="title">知识列表</h3>
      <el-table
        :data="tableData1" border
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
          :label="copyRateTitle"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-html="scope.row.repeatRate"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="重复字数"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-html="scope.row.repeatWords"></span><br>
            <span style="margin-left: 10px" v-html="scope.row.fileTreeName"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <hr>
    <div id="part3">
      <h3 class="title">内容对比</h3>
      <el-table
        :data="tableData2" border
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
            <div style="color: darkred;text-align: center;font-size: 16px;font-weight: 600;">
              此处有<span v-html="scope.row.similarWordNum"></span>字相似
            </div>
            <span style="margin-left: 10px" v-html="scope.row.sourceContent"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="相似内容来源"
          width="">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-html="scope.row.targetFileName"></span><br>
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
        tableData1:[],
        tableData2:[],
        searchId:'',
        loading: false,
        winHeight:'',
        singerMaxCopyRate:'单篇最大文字复制比', //单篇最大文字复制比
        copyRate:'',//总复制比
        copyRateTitle:'',//知识列表标题文字复制比
        totalWords:'',//总字数
        singerMaxRepeatWords:'',//单篇最大重复字数
        repeatWords:'',//重复字数
        similarSectionMaxRepeatWords:'',//疑似段落最大重合字数
        similarSectionMinRepeatWords:'',//疑似段落最小重合字数
        similarSectionNum:'',//疑似段落数
        singerMaxCopyRate:'',//单篇最大文字复制比
        sectionNum:''//总段落数
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
            console.log("1:",response.data.data.segmentList);
            this.copyRate = response.data.data.copyRate;
            this.totalWords = response.data.data.totalWords;
            this.sectionNum = response.data.data.sectionNum;
            this.repeatWords = response.data.data.repeatWords;
            this.singerMaxCopyRate = response.data.data.singerMaxCopyRate;
            this.similarSectionNum = response.data.data.similarSectionNum;
            this.singerMaxRepeatWords = response.data.data.singerMaxRepeatWords;
            this.similarSectionMaxRepeatWords = response.data.data.similarSectionMaxRepeatWords;
            this.similarSectionMinRepeatWords = response.data.data.similarSectionMinRepeatWords;
            this.copyRateTitle = '文字复制比：'+response.data.data.copyRate;
            this.tableData1 = [];
            this.tableData1 = response.data.data.searchingList;
            this.tableData2 = [];
            this.tableData2 = response.data.data.segmentList;
            this.loading = false;
          })
          .catch((response) => {
            this.tableData1 = [];
            this.tableData2 = [];
            this.loading = false;
          });
      }
      this.$on('bridge',()=>{
        this.search();
      });
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
              console.log("2:",response.data.data.segmentList);
              this.copyRate = response.data.data.copyRate;
              this.totalWords = response.data.data.totalWords;
              this.sectionNum = response.data.data.sectionNum;
              this.repeatWords = response.data.data.repeatWords;
              this.singerMaxCopyRate = response.data.data.singerMaxCopyRate;
              this.similarSectionNum = response.data.data.similarSectionNum;
              this.singerMaxRepeatWords = response.data.data.singerMaxRepeatWords;
              this.similarSectionMaxRepeatWords = response.data.data.similarSectionMaxRepeatWords;
              this.similarSectionMinRepeatWords = response.data.data.similarSectionMinRepeatWords;
              this.tableData1 = [];
              this.tableData1 = response.data.data.searchingList;
              this.tableData2 = [];
              this.tableData2 = response.data.data.segmentList;
              this.loading = false
            })
            .catch((response) => {
              this.tableData1 = [];
              this.tableData2 = [];
              this.loading = false
            });
        }
      },
      ['checkId'] (val, oldval) {
        console.log('checkId改变：',val,oldval);
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
              console.log("3:",response.data.data.segmentList);
              this.copyRate = response.data.data.copyRate;
              this.totalWords = response.data.data.totalWords;
              this.sectionNum = response.data.data.sectionNum;
              this.repeatWords = response.data.data.repeatWords;
              this.singerMaxCopyRate = response.data.data.singerMaxCopyRate;
              this.similarSectionNum = response.data.data.similarSectionNum;
              this.singerMaxRepeatWords = response.data.data.singerMaxRepeatWords;
              this.similarSectionMaxRepeatWords = response.data.data.similarSectionMaxRepeatWords;
              this.similarSectionMinRepeatWords = response.data.data.similarSectionMinRepeatWords;
              this.tableData1 = [];
              this.tableData1 = response.data.data.searchingList;
              this.tableData2 = [];
              this.tableData2 = response.data.data.segmentList;
              this.loading = false
            })
            .catch((response) => {
              this.tableData1 = [];
              this.tableData2 = [];
              this.loading = false
            });
        }
      },
      ['historyId'](val, oldval) {
        console.log('historyId改变：',val,oldval);
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
            console.log("4:",response.data.data.segmentList);
            this.copyRate = response.data.data.copyRate;
            this.totalWords = response.data.data.totalWords;
            this.sectionNum = response.data.data.sectionNum;
            this.repeatWords = response.data.data.repeatWords;
            this.singerMaxCopyRate = response.data.data.singerMaxCopyRate;
            this.similarSectionNum = response.data.data.similarSectionNum;
            this.singerMaxRepeatWords = response.data.data.singerMaxRepeatWords;
            this.similarSectionMaxRepeatWords = response.data.data.similarSectionMaxRepeatWords;
            this.similarSectionMinRepeatWords = response.data.data.similarSectionMinRepeatWords;
            this.tableData1 = [];
            this.tableData1 = response.data.data.searchingList;
            this.tableData2 = [];
            this.tableData2 = response.data.data.segmentList;
            this.loading = false
          })
          .catch((response) => {
            this.tableData1 = [];
            this.tableData2 = [];
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
  a {
    color: #42b983;
  }
  #btnNav{
    margin-bottom: 10px;
  }
  h3{
    margin: 5px 0px;
  }
  hr{
    margin: 5px 0px;
  }
  .fontRed{
    color: darkred;
  }
  #part1 table{
    border-collapse: collapse;
    width: 50%;
  }
  #part1 table tr{
    line-height: 35px;
  }
  #part1 table td{
    border: 1px solid #dedede;
    padding: 5px 10px;
  }
  .item{
    margin: 0px 50px 0px 50px;
  }
  #dialog1 .el-dialog__body,
  #dialog2 .el-dialog__body{
    /*height: 500px;*/
    /*overflow: auto;*/
  }
  .el-dialog{
    margin-top: 10px !important;
  }
</style>
