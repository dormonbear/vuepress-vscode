import PubSub              from "pubsub-js";
import { WINDOW_ONRESIZE } from "./utils/constants";

function integrateGitment(router) {
  const scriptGitment = document.createElement('script');
  scriptGitment.src = 'https://imsun.github.io/gitment/dist/gitment.browser.js';
  document.body.appendChild(scriptGitment);

  let lastPath;

  router.afterEach((to) => {
    if (!lastPath || lastPath !== to.path) {
      if (scriptGitment.onload) {
        renderGitment(to.path);
        lastPath = to.path;
      } else {
        scriptGitment.onload = () => {
          const commentsContainer = document.createElement('div');
          commentsContainer.id = 'comments-container';
          commentsContainer.classList.add('content');
          const $page = document.querySelector('.page');
          if ($page) {
            $page.appendChild(commentsContainer);
            renderGitment(to.path);
          }
        };
      }
    }
  });

  function renderGitment(fullPath) {
    const gitment = new Gitment(
      {
        id   : fullPath,
        owner: 'dormon@dormon.net',
        repo : 'blogcomment',
        oauth: {
          client_id    : '80c1932fcb7670ab08be',
          client_secret: '6117ff85c82bb7fae177342456b0ba00b11ef69f',
        },
      });
    gitment.render('comments-container');
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

  try {
    document && integrateGitment(router);
  } catch (e) {
    console.error(e.message);
  }
}
