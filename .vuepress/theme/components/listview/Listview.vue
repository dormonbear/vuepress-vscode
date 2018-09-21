<template>
  <div ref="listRows"
       class="list-rows"
       @mouseenter="onListRowsMouseEnter"
       @mouseleave="onListRowsMouseLeave"
  >
    <div class="list-row" v-for="n in 100">
      <div class="action"></div>
      <div class="article-title">
        <div class="label-container">
          <a class="label-name">{{n}}</a>
          <span class="label-description">dsadasd</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PerfectScrollbar from '../perfect-scrollbar';

  export default {
    name   : 'listview',
    data() {
      return {
        scrollVisible: false,
        ps           : PerfectScrollbar | undefined
      }
    },
    mounted() {
      this.ps = new PerfectScrollbar('.list-rows');
    },
    methods: {
      onListRowsMouseEnter() {
        this.scrollVisible = true;
        let listRows       = this.$refs.listRows;
        listRows.className = listRows.className.split('invisible')
                                     .join('') + ' visible';
      },
      onListRowsMouseLeave() {
        this.scrollVisible = false;
        let listRows       = this.$refs.listRows;
        listRows.className = listRows.className.split('visible')
                                     .join('') + ' invisible';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scroll-area {
    position : relative;
    margin   : auto;
    height   : 100px;
  }

  .list-rows {
    position : relative;
    width    : 100%;
    height   : 100%;
  }

  .list-row {
    height         : 22px;
    position       : relative;
    -o-box-sizing  : border-box;
    -ms-box-sizing : border-box;
    box-sizing     : border-box;
    cursor         : pointer;
    width          : 100%;
    touch-action   : none;
    padding-left   : 22px;
    display        : flex;
    flex-direction : row;

    .action {
      width  : 12px;
      height : 22px;
    }

    .action.opened {
      background : url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='3 3 16 16'%3E%3Cpath fill='%23e8e8e8' d='M12.597 11.042l2.803 2.803-1.556 1.555-2.802-2.802L8.239 15.4l-1.556-1.555 2.802-2.803-2.802-2.803 1.555-1.556 2.804 2.803 2.803-2.803L15.4 8.239z'/%3E%3C/svg%3E") 50% no-repeat
    }

    .article-title {
      flex          : 1;
      height        : 22px;
      line-height   : 22px;
      display       : flex;
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

        .label-description {
          margin-left : .5em;
          font-size   : .9em;
          white-space : pre;
          line-height : 22px;
        }
      }
    }

    .article-title:before {
      color                  : #519aba;
      content                : '\E055';
      font-family            : 'seti';
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

  .list-row:hover > .action {
    background : url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='3 3 16 16'%3E%3Cpath fill='%23e8e8e8' d='M12.597 11.042l2.803 2.803-1.556 1.555-2.802-2.802L8.239 15.4l-1.556-1.555 2.802-2.803-2.802-2.803 1.555-1.556 2.804 2.803 2.803-2.803L15.4 8.239z'/%3E%3C/svg%3E") 50% no-repeat
  }

  .list-row:focus {
    background-color : #094771;
  }

  .list-row:hover {
    background-color : #37373d;
  }

  .list-row.selected {
    background-color : #37373d;
  }
</style>
