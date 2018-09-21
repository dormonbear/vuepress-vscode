<template>
  <div class="splitview">
    <div class="splitview-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'splitview',
  }
</script>

<style lang="scss" scoped>
  .splitview {
    position : relative;
    width    : 100%;

    .splitview-panel-view {
      transition-duration                : .15s;
      -webkit-transition-duration        : .15s;
      -moz-transition-duration           : .15s;
      transition-timing-function         : ease-out;
      -webkit-transition-timing-function : ease-out;
      -moz-transition-timing-function    : ease-out;
      transition-property                : height;
      -webkit-transition-property        : height;
      -moz-transition-property           : height;
    }
  }

  .splitview-container {
    display        : flex;
    width          : 100%;
    height         : 100%;
    white-space    : nowrap;
    flex-direction : column;
  }
</style>
