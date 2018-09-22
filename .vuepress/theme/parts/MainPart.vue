<template>
  <div class="main-view">
    <sidebar-part :checkedItem.sync="checkedItem" :showNavbar.sync="showNavbar"></sidebar-part>
    <div class="main-area">
      <navbar-part v-show="showNavbar"
                   ref="navbar_part"
                   :style="{width: navbarWidth + 'px', minWidth: '170px'}"
                   :checkedItem="checkedItem"
      ></navbar-part>
      <content-part :width="contentPartWidth" :style="{width: `${contentPartWidth}px`}"></content-part>
      <div class="sash vertical" :style="{left: showNavbar ? navbarWidth - 2 + 'px' : 0}"
           @mousedown="onSashMouseDown"></div>
    </div>
  </div>
</template>

<script>
  import SidebarPart          from "./SidebarPart";
  import NavbarPart           from "./NavbarPart";
  import ContentPart          from "./ContentPart";
  import { createStyleSheet } from "../utils/dom";
  import store                from '../store';

  export default {
    components: {
      SidebarPart,
      NavbarPart,
      ContentPart
    },
    data() {
      return {
        mouseMoveOffsetX: 0,
        navbarWidth     : store.navbarWidth,
        checkedItem     : store.checkedItem,
        showNavbar      : store.showNavbar,
        lastCheckedItem : store.lastCheckedItem
      };
    },
    computed  : {
      contentPartWidth() {
        return this.viewWidth - 50 - this.navbarWidth;
      }
    },
    methods   : {
      onSashMouseDown(e) {
        if (!this.showNavbar) {
          this.navbarWidth = 0;
        }
        this.mouseMoveOffsetX = 0;
        const startX = e.pageX;
        const style = createStyleSheet(this.$el);
        style.innerHTML = `* { cursor: ew-resize !important; }`;
        const initialNavbarWidth = this.navbarWidth;

        const onMouseMove = e => {
          this.mouseMoveOffsetX = e.pageX - startX;
          this.navbarWidth = initialNavbarWidth + this.mouseMoveOffsetX;
          if (this.navbarWidth < 170 && this.navbarWidth >= 100) {
            this.navbarWidth = 170;
            this.showNavbar = true;
            this.checkedItem = 'explore';
            store.checkedItem = 'explore';
            store.showNavbar = true;
          } else if (this.navbarWidth < 100) {
            this.navbarWidth = 0;
            this.showNavbar = false;
            store.showNavbar = false;
          } else if (this.navbarWidth >= 170) {
            this.showNavbar = true;
            store.showNavbar = true;
          }
          store.navbarWidth = this.navbarWidth;
        };

        const onMouseUp = () => {
          removeEventListener("mousemove", onMouseMove);
          removeEventListener("mouseup", onMouseUp);
          this.$el.removeChild(style);
        };

        addEventListener("mousemove", onMouseMove);
        addEventListener("mouseup", onMouseUp);
      }
    },
    watch     : {
      showNavbar(val) {
        if (val) {
          if (this.navbarWidth < 170) this.navbarWidth = 200;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .main-view {
    height : calc(100vh - 22px);
    width  : 100%;
  }

  .main-area {
    position       : absolute;
    left           : 50px;
    top            : 0;
    width          : calc(100% - 50px);
    height         : calc(100% - 22px);
    display        : flex;
    flex-direction : row;
  }
</style>
