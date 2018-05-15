<template>
  <div>
    {{msg}}-{{$route.params.key}}
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data () {
      return {
        show:true,
        msg: 'Welcome to Your detail'
      }
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
