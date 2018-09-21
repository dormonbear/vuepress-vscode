<template>
  <div
    class="tree-row"
  >
    <div
      :class="contentClass"
      @click="handleTreeRowClick"
      :style="{paddingLeft: `${treeItemData.level * 12}px`}"
    >
      <div :class="treeItemClass">
        <div class="label-container">
          <a class="label-name">{{treeItemData.title}}</a>
        </div>
      </div>
    </div>
    <div
      class="children"
      v-if="expanded"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import PubSub                          from 'pubsub-js';
  import { ANCHOR_SCROLL, CURRENT_PAGE } from "../../utils/constants";
  import store                           from '../../store';

  export default {
    name    : "tree-view-item",
    props   : ["treeItemData"],
    data() {
      return {
        expanded: store.expandedItems.indexOf(this.treeItemData.key) !== -1,
      };
    },
    watch   : {
      $page: {
        handler() {
          if (this.treeItemData.path === this.$route.path) {
            PubSub.publishSync(CURRENT_PAGE, this.treeItemData);
          }
        },
        immediate: true
      }
    },
    computed: {
      contentClass() {
        return [
          'content',
          {
            expanded: this.expanded,
            folder  : this.treeItemData.type === 'dict',
            selected: this.treeItemData.type !== 'dict' && (this.treeItemData.path === this.$route.path || ('#' + this.treeItemData.slug) === this.$route.hash)
          }
        ];
      },
      treeItemClass() {
        let clazz = ['tree-item'];
        if (this.treeItemData.type === 'file') {
          if (this.treeItemData.frontmatter.seti) {
            clazz.push(this.treeItemData.frontmatter.seti);
          } else {
            clazz.push('default');
          }
        } else if (this.treeItemData.type === 'header') {
          clazz.push('header');
        } else if (this.treeItemData.type === 'dict' && this.treeItemData.frontmatter) {
          clazz.push(this.treeItemData.frontmatter.seti || 'default');
        } else {
          clazz.push('default');
        }
        return clazz;
      }
    },
    methods : {
      handleTreeRowClick() {
        if (this.treeItemData.type === "dict") {
          this.expanded = !this.expanded;
          if (this.expanded) {
            if (store.expandedItems.indexOf(this.treeItemData.key) === -1) {
              store.expandedItems.push(this.treeItemData.key);
            }
          } else {
            store.expandedItems.splice(
              store.expandedItems.indexOf(this.treeItemData.key),
              1
            );
          }
          this.$emit("expandedStateChanged");
        }
        if (this.treeItemData.hasContent || this.treeItemData.type === 'file' || this.treeItemData.type === 'header') {
          this.$router.push(this.treeItemData.path);
          PubSub.publishSync(ANCHOR_SCROLL, this.treeItemData.slug);
        }
      }
    }
  };
</script>

<style lang="scss">

  .tree-row {
    -o-box-sizing  : border-box;
    -ms-box-sizing : border-box;
    box-sizing     : border-box;
    cursor         : pointer;
    overflow       : hidden;
    width          : 100%;
    touch-action   : none;

    .content:hover {
      background-color : #2a2d2e;
    }

    .content.selected {
      background-color : #094771;
    }

    .children {
      display : block;
    }

    .content {
      position : relative;
      height   : 100%;
      display  : flex;

      .tree-item {
        display       : flex;
        flex          : 1;
        flex-wrap     : nowrap;
        height        : 22px;
        line-height   : 22px;
        overflow      : hidden;
        text-overflow : ellipsis;

        .label-container {
          overflow      : hidden;
          text-overflow : ellipsis;

          .label-name {
            color           : inherit;
            white-space     : pre;
            text-decoration : none;
          }
        }
      }
    }
  }

  .tree-row {

    .content {

      @import "../../styles/icon";

      .tree-item:before {
        font-family            : "seti";
        font-size              : 150%;
        background-size        : 16px;
        background-position    : 0;
        background-repeat      : no-repeat;
        padding-right          : 6px;
        width                  : 16px;
        height                 : 22px;
        display                : inline-block;
        -webkit-font-smoothing : antialiased;
        vertical-align         : top;
        flex-shrink            : 0;
      }
    }
  }

  .tree-row {

    .content.folder:before {
      background-size     : 16px;
      background-position : 50% 50%;
      background-repeat   : no-repeat;
      padding-right       : 6px;
      width               : 16px;
      height              : 22px;
      display             : inline-block;
      vertical-align      : top;
      content             : " ";
      background-image    : url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23E8E8E8' d='M6 4v8l4-4-4-4zm1 2.414L8.586 8 7 9.586V6.414z'/%3E%3C/svg%3E");
    }

    .content.folder.expanded:before {
      background-size     : 16px;
      background-position : 50% 50%;
      background-repeat   : no-repeat;
      padding-right       : 6px;
      width               : 16px;
      height              : 22px;
      display             : inline-block;
      vertical-align      : top;
      content             : " ";
      background-image    : url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='%23E8E8E8' d='M11 10H5.344L11 4.414V10z'/%3E%3C/svg%3E");
    }
  }

</style>
