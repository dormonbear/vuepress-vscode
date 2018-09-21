import PubSub              from "pubsub-js";
import { WINDOW_ONRESIZE } from "./utils/constants";
import Valine              from 'valine';

function integrateValine(router) {
  let lastPath;

  router.afterEach((to) => {
    if (!lastPath || lastPath !== to.path) {
      // if (scriptGitment.onload) {
      //   renderGitment(to.path);
      //   lastPath = to.path;
      // } else {
      //   scriptGitment.onload = () => {
      //     const commentsContainer = document.createElement('div');
      //     commentsContainer.id = 'comments-container';
      //     commentsContainer.classList.add('content');
      //     const $page = document.querySelector('.article');
      //     if ($page) {
      //       $page.appendChild(commentsContainer);
      //       renderGitment(to.path);
      //     }
      //   };
      // }
      if (typeof window !== 'undefined') {
        renderValine(to.path);
      }
    }
    renderValine(to.path);
  });

  if (typeof window !== 'undefined') {
    this.window = window;
    window.AV = require('leancloud-storage');
  }

  function renderValine(path) {
    new Valine(
      {
        el         : '.comments-container',
        appId      : '1dKnN1anqIz6mjtStD4IGwU6-gzGzoHsz',// your appId
        appKey     : 'c52JHNklKRvNq5NxJ09zES2o', // your appKey
        notify     : false,
        verify     : false,
        avatar     : 'retro',
        placeholder: '随便逼逼',
        path       : path
      });
  }
}

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
  //
  // try {
  //   document && integrateValine(router);
  // } catch (e) {
  //   console.error(e.message);
  // }
}
