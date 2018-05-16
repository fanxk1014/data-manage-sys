<template>
  <div>
    内容对比{{$route.params.searchId}}-{{searchId}}
    <el-table
      :data="tableData"
      border height="500"
      style="width: 100%">
      <el-table-column
        prop="sourceContent"
        label="原文内容"
        width="">
      </el-table-column>
      <el-table-column
        prop="targetContent"
        label="相似内容来源"
        width="">
      </el-table-column>
    </el-table>
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
  #btnNav{
    margin-bottom: 10px;
  }
</style>
