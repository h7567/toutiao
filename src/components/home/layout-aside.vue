<template>
  <div class="layout-aside">
      <div class="title">
        <!-- logo也是动态的 -->
        <!-- 折叠显示小logo,展开显示大图 -->
          <img :src="collapse? smaImg : bigImg" alt="">
      </div>
      <!-- 导航菜单 开启路由模式简写 router -->
      <!-- 此时collapse是从collapse传过来的状态 -->
      <el-menu :collapse="collapse" :router="true" background-color="#323745" text-color="#adafb5">
         <el-menu-item index="/home">
             <i class="el-icon-s-home"></i>
             <span>首页</span>
         </el-menu-item>
         <!-- 二级菜单 -->
         <el-submenu index=2>
           <template slot="title">
               <i class="el-icon-s-grid"></i>
               <span>内容管理</span>
           </template>
             <!-- 二级菜单项 -->
             <el-menu-item index="/home/publish">发布文章</el-menu-item>
             <el-menu-item index="/home/articles">文章列表</el-menu-item>
             <el-menu-item index="/home/comment">评论列表</el-menu-item>
             <el-menu-item index="/home/material">素材管理</el-menu-item>
         </el-submenu>

          <el-submenu index=3>
            <template slot="title">
               <i class="el-icon-s-opportunity"></i>
               <span>粉丝管理</span>
            </template>
             <!-- 二级菜单项 -->
             <el-menu-item index="/home/picture">图文数据</el-menu-item>
             <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
             <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
             <el-menu-item index="/home/fansphoto">粉丝画像</el-menu-item>
           </el-submenu>
         <el-menu-item index="/home/account">
             <i class="el-icon-user-solid"></i>
              <span>账户信息</span>
         </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  props: ['collapse'], // 接收父组件传过来的collapse
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smaImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang='less' scoped>
  .layout-aside{
      // width: 240px;
      height: 100vh;
      background-color: #2e2f32;
      .title {
        text-align: center;
        padding: 10px 0;
        img{
         height: 35px;
        }
      }
      .el-menu{
        border-right: none;
      }
  }
</style>
