<template>
  <div class="footer-view" :style="{width: `${viewWidth}px`}">
    <div class="footerbar-item left">
      <a href="//vuepress.vuejs.org/" target="_blank" class="status">
        powered by vuepress
      </a>
      <a class="status">
        ©2018 辽ICP备17009487号-1
      </a>
    </div>

    <div class="footerbar-item right">
      <a class="status">
        最后更新于 {{lastUpdatedAt}}
      </a>
      <a class="status" v-if="createdAt">
        创建于 {{createdAt}}
      </a>
    </div>
  </div>
</template>

<script>
  import { timestampToDateString } from "../utils/data.js";

  export default {
    name    : "footer-part",
    data() {
      return {};
    },
    computed: {
      lastUpdatedAt() {
        return timestampToDateString(this.$page.lastUpdated);
      },
      createdAt() {
        return this.$page.frontmatter.createdAt;
      }
    }
  };
</script>

<style lang="scss">
  .footer-view {
    background-color : rgb(0, 122, 204);
    color            : rgb(255, 255, 255);
    position         : absolute;
    box-sizing       : border-box;
    cursor           : default;
    width            : 100%;
    height           : 22px;
    font-size        : 12px;
    padding          : 0 10px;
    overflow         : hidden;

    .footerbar-item {
      display        : inline-block;
      line-height    : 22px;
      height         : 100%;
      vertical-align : top;

      a {
        text-decoration : none;
        cursor          : pointer;
        display         : inline-block;
        height          : 100%;
        color           : white;
      }
    }

    .right {
      float : right;
      a {
        margin-left : 5px;
      }
    }

    .left {
      float : left;
      a {
        margin-right : 5px;
      }
    }
  }
</style>
