<template>
  <div class="sidebar-view">
    <div class="content">
      <div class="composite-bar">
        <div class="action-bar">
          <ul class="action-container">
            <li :class="exploreClass" @click="handleExplore">
              <a class="action-label explore"></a>
            </li>
            <li :class="searchClass" @click="handleSearch">
              <a class="action-label search"></a>
            </li>
          </ul>
        </div>
      </div>
      <div class="global-activity">
        <div class="action-bar">
          <div class="action-container">
            <ul class="action-item" @click="$router.push('/')">
              <li class="action-item" style="text-align: center">
                <img style="width: 40px; height: 40px;border-radius: 25px" src="../../public/favicon.jpg" alt="dormon">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import store from '../store';

  export default {
    name    : "sidebar-part",
    props   : {
      checkedItem: {
        required: true
      },
      showNavbar : {
        required: true
      }
    },
    computed: {
      exploreClass() {
        return [
          "action-item",
          {
            checked: this.checkedItem === "explore" && this.showNavbar
          }
        ];
      },
      searchClass() {
        return [
          "action-item",
          {
            checked: this.checkedItem === "search" && this.showNavbar
          }
        ];
      }
    },
    methods : {
      handleExplore() {
        if (this.checkedItem === "explore") {
          this.$emit("update:checkedItem", "");
          this.$emit("update:showNavbar", false);
          store.checkedItem = "";
          store.showNavbar = false;
        } else {
          this.$emit("update:checkedItem", "explore");
          this.$emit("update:showNavbar", true);
          store.checkedItem = "explore";
          store.showNavbar = true;
        }
      },
      handleSearch() {
        if (this.checkedItem === "search") {
          this.$emit("update:checkedItem", "");
          this.$emit("update:showNavbar", false);
          store.checkedItem = "";
          store.showNavbar = false;
        } else {
          this.$emit("update:checkedItem", "search");
          this.$emit("update:showNavbar", true);
          store.checkedItem = "search";
          store.showNavbar = true;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .sidebar-view {
    background-color : rgb(51, 51, 51);
    height           : calc(100vh - 22px);
    top              : 0;
    bottom           : 0;
    left             : 0;
    position         : absolute;
    width            : 50px;
    box-sizing       : border-box;

    .content {
      display         : flex;
      flex-direction  : column;
      justify-content : space-between;
      font-size       : 13px;
      width           : 50px;
      height          : calc(100vh - 22px);

      .action-bar {
        text-align       : left;
        background-color : inherit;
        overflow         : hidden;
        white-space      : nowrap;

        .action-container {
          display : inline-block;
          margin  : 0 auto;
          padding : 0;
          width   : 100%;

          .action-item {
            display    : block;
            position   : relative;
            padding    : 5px 0;
            cursor     : pointer;
            transition : transform 50ms ease;

            .action-label {
              display             : flex;
              overflow            : hidden;
              height              : 40px;
              line-height         : 40px;
              margin-right        : 0;
              padding             : 0 0 0 50px;
              box-sizing          : border-box;
              font-size           : 15px;
              opacity             : 0.6;
              background-position : 50% 50%;
              background-repeat   : no-repeat;
            }

            .action-label.explore {
              background-image : url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath d='M17.705 8H9s-2 .078-2 2v15s0 2 2 2l11-.004C22 27 22 25 22 25V13.509L17.705 8zM16 10v5h4v10H9V10h7zm5.509-6h-8.493S11 4.016 10.985 6H19v.454L22.931 11H24v12c2 0 2-1.995 2-1.995V9.648L21.509 4z' fill='%23fff'/%3E%3C/svg%3E");
            }

            .action-label.search {
              background-image : url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cpath d='M19.23 4.095c-4.842 0-8.769 3.928-8.769 8.771 0 1.781.539 3.43 1.449 4.815 0 0-5.482 5.455-7.102 7.102-1.621 1.646 1.001 4.071 2.602 2.409 1.602-1.659 7.006-7.005 7.006-7.005a8.726 8.726 0 0 0 4.814 1.45 8.773 8.773 0 0 0 8.772-8.771c.001-4.844-3.927-8.771-8.772-8.771zm0 15.035a6.265 6.265 0 1 1 0-12.529 6.264 6.264 0 1 1 0 12.529z' fill='%23fff'/%3E%3C/svg%3E");
            }
          }

          .action-item.checked {
            .action-label {
              opacity : 1;
            }
          }

          .action-item:hover {
            .action-label {
              opacity : 1;
            }
          }
        }
      }
    }
  }
</style>
