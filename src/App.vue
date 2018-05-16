<template>
  <div id="app">

    <el-container style="height: 100%" direction="vertical">
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="grid-content bg-purple">
              易达科技自然语言识别系统
            </div>
          </el-col>
          <el-col :span="1" class="right"><div class="grid-content bg-purple-light">
            <el-button type="text">退出系统</el-button>
          </div></el-col>
          <el-col :span="2" class="right"><div class="grid-content bg-purple-light">欢迎您：管理员</div></el-col>
        </el-row>
      </el-header>
      <el-container style="background: red;">
        <el-aside width="200px">

          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo">
                <el-menu-item index="1">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航一</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <i class="el-icon-document"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-setting"></i>
                  <span slot="title">导航四</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>

        </el-aside>
        <el-container>
          <el-main>

            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>

          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: 'This is Hi1 page',
        styleObject: {
          color: 'red',
          fontSize: '13px'
        }
      }
    },
    mounted: function () {

    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
    height: 100%;
  }

  body,html{
    height: 100%;
  }
  *{
    margin: 0;
    padding: 0;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #FFFFFF;
    color: #333;
    text-align: center;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .tips {
    background: rgb(255, 204, 153);
    padding: 10px;
    margin-bottom: 10px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
