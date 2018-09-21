<template>
  <div class="navbar-view">
    <div class="composite title">
      <div class="title-label">
        <h2 v-if="checkedItem === 'explore'">资源管理器</h2>
        <h2 v-if="checkedItem === 'search'">搜索</h2>
      </div>
      <div class="title-actions"></div>
    </div>
    <splitview v-show="checkedItem === 'explore'">
      <splitview-panel
        title="文章列表"
        :style="{height: `${articlesHeight}px`}"
        :expanded="articlesExpanded"
        :showActions="true"
        @toggleExpanded="toggleArticlesExpanded"
        @toggleSwitch="toggleSwitch"
      >
        <treeview :treeData="pathTree ? $site.themeConfig.pathTree : $site.themeConfig.dateTree" name="article-tree" :style="{height: articlesHeight}"></treeview>
      </splitview-panel>
      <splitview-panel
        title="大纲"
        :style="{height: `${outlineHeight}px`}"
        :expanded="outlineExpanded"
        @toggleExpanded="toggleOutlineExpanded"
      >
        <treeview :treeData="outlineTreeData" name="outline-tree" :style="{height: `${outlineHeight}px`}"></treeview>
      </splitview-panel>
    </splitview>
    <search-view v-show="checkedItem === 'search'"></search-view>
  </div>
</template>

<script src="./navbar-part.js"></script>

<style lang="scss" scoped>
  .navbar-view {
    background-color : rgb(37, 37, 38);
    width            : 200px;
    top              : 0;
    bottom           : 22px;
    position         : relative;
    box-sizing       : border-box;
  }

  .composite.title {
    display       : flex;
    height        : 35px;
    box-sizing    : border-box;
    overflow      : hidden;
    padding-left  : 8px;
    padding-right : 8px;

    .title-label {
      line-height   : 35px;
      white-space   : nowrap;
      overflow      : hidden;
      text-overflow : ellipsis;
      padding-left  : 12px;

      h2 {
        color                 : rgb(187, 187, 187);
        text-transform        : uppercase;
        font-size             : 11px;
        cursor                : default;
        font-weight           : 400;
        -webkit-margin-before : 0;
        -webkit-margin-after  : 0;
        overflow              : hidden;
        white-space           : nowrap;
        text-overflow         : ellipsis;
        margin                : 0;
      }
    }

    .title-actions {
      flex         : 1;
      padding-left : 5px;
      height       : 35px;
    }
  }
</style>
