<template>
  <div class="splitview-panel-view">
    <div class="splitview-panel">
      <div :class="panelHeaderClass" @click="togglePanelExpandedState">
        <h3 class="title">{{title}}</h3>
        <div class="actions" v-if="showActions">
          <div class="action-bar">
            <ul class="actions-container">
              <li class="action-item" @click.stop="toggleSwitch">
                <a class="action-label"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="panel-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name    : 'splitview-panel',
    props   : {
      title      : {
        type: String
      },
      expanded   : {
        type: Boolean
      },
      showActions: {
        default: false
      }
    },
    computed: {
      panelHeaderClass() {
        return [
          'panel-header',
          {
            expanded: this.expanded
          }
        ];
      }
    },
    methods : {
      togglePanelExpandedState() {
        this.$emit('toggleExpanded');
      },
      toggleSwitch() {
        this.$emit('toggleSwitch');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .splitview-panel-view {
    width       : 100%;
    white-space : normal;
    flex        : none;
  }

  .splitview-panel {
    overflow       : hidden;
    width          : 100%;
    height         : 100%;
    display        : flex;
    flex-direction : column;

    &:hover {
      .action-label {
        background : url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='-1 0 16 16'%3E%3Cpath fill='%23C5C5C5' d='M14 1v9h-1V2H5V1h9zM3 3v1h8v8h1V3H3zm7 2v9H1V5h9zM8 7H3v5h5V7z'/%3E%3Cpath fill='%2375BEFF' d='M4 9h3v1H4z'/%3E%3C/svg%3E") 50% no-repeat;
      }
    }
  }

  .panel-header {
    height              : 22px;
    line-height         : 22px;
    background-color    : rgba(128, 128, 128, 0.2);
    font-weight         : 400;
    font-size           : 11px;
    text-transform      : uppercase;
    padding-left        : 20px;
    overflow            : hidden;
    display             : flex;
    cursor              : pointer;
    background-image    : url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23e8e8e8' d='M6 4v8l4-4-4-4zm1 2.414L8.586 8 7 9.586V6.414z'/%3E%3C/svg%3E");
    background-position : 2px;
    background-repeat   : no-repeat;

    &.expanded {
      background-image : url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath fill='%23e8e8e8' d='M11 10.07H5.344L11 4.414v5.656z'/%3E%3C/svg%3E")
    }

    h3.title {
      white-space           : nowrap;
      text-overflow         : ellipsis;
      overflow              : hidden;
      font-size             : 11px;
      -webkit-margin-before : 0;
      -webkit-margin-after  : 0;
      margin                : 0;
    }

    .actions {
      display : block;
      flex    : 1;

      .action-bar {
        text-align  : right;
        overflow    : hidden;
        white-space : nowrap;

        .actions-container {
          display         : flex;
          margin          : 0 auto;
          padding         : 0;
          width           : 100%;
          justify-content : flex-end;

          .action-item {
            cursor     : pointer;
            display    : inline-block;
            transition : transform 50ms ease;
            position   : relative;

            &:active {
              -webkit-transform : scale(1.272019649);
              transform         : scale(1.272019649);
            }

            .action-label {
              width               : 28px;
              height              : 22px;
              background-size     : 16px;
              margin-right        : 0;
              text-decoration     : none;
              font-size           : 11px;
              background-position : 50%;
              background-repeat   : no-repeat;
              display             : inline-block;
            }
          }
        }
      }
    }
  }

  .panel-body {
    overflow : hidden;
    flex     : 1;
  }
</style>
