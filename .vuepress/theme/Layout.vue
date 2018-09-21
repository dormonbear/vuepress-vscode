<template>
  <div>
    <main-part></main-part>
    <footer-part></footer-part>
  </div>
</template>

<script>
  import MainPart            from './parts/MainPart';
  import FooterPart          from './parts/FooterPart';
  import PubSub              from 'pubsub-js';
  import { WINDOW_ONRESIZE } from "./utils/constants";
  import _                   from 'lodash';

  export default {
    name      : 'layout',
    components: {
      MainPart,
      FooterPart
    },
    mounted() {
      this.publishViewDimension();
      window.onresize = _.throttle(this.publishViewDimension, 300);
      window.addEventListener('scroll', this.onScroll);
    },
    methods   : {
      publishViewDimension() {
        PubSub.publishSync(WINDOW_ONRESIZE, {
          height: document.documentElement.clientHeight,
          width : document.documentElement.clientWidth
        });
      },
      onScroll() {
        _.throttle(function () {
          this.setActiveHash();
        }, 300);
      },
      setActiveHash() {
        // const sidebarLinks = [].slice.call(document.querySelectorAll('.sidebar-link'))
        const anchors = [].slice.call(document.querySelectorAll('.header-anchor'));
        // .filter(anchor => sidebarLinks.some(sidebarLink => sidebarLink.hash === anchor.hash))

        console.log(anchors);
        const scrollTop = Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        );

        for (let i = 0; i < anchors.length; i++) {
          const anchor = anchors[i];
          const nextAnchor = anchors[i + 1];

          const isActive = i === 0 && scrollTop === 0 ||
            (scrollTop >= anchor.parentElement.offsetTop + 10 &&
              (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10));

          if (isActive && decodeURIComponent(this.$route.hash) !== decodeURIComponent(anchor.hash)) {
            store.disableScrollBehavior = true;
            this.$router.replace(decodeURIComponent(anchor.hash), () => {
              // execute after scrollBehavior handler.
              this.$nextTick(() => {
                store.disableScrollBehavior = false;
              });
            });
            return;
          }
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    }
  };
</script>

<style lang="scss">
  @import "./styles/main";

  @font-face {
    src         : url('./assets/seti/seti.woff') format('woff');
    font-family : 'seti';
    font-weight : normal;
    font-style  : normal;
  }
</style>
