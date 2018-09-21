import PubSub              from "pubsub-js";
import { WINDOW_ONRESIZE } from "./utils/constants";

export default ({ Vue, options, router, siteData }) => {
  Vue.mixin(
    {
      data   : function () {
        return {
          viewHeight: 0,
          viewWidth : 0
        };
      },
      created: function () {
        PubSub.subscribe(WINDOW_ONRESIZE, (msg, data) => {
          this.viewHeight = data.height;
          this.viewWidth = data.width;
        });
      }
    }
  );

  router.beforeEach((to, from, next) => {
    if (!to.name) {
      next('/');
    } else {
      next();
    }
  });
}
