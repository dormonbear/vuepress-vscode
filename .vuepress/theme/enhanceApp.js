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
        repo : 'dormonbear.github.io',
        oauth: {
          client_id    : '122e2ab9330dd3e3a733',
          client_secret: 'ee0371cf1d498e21ec996fe8628b7760fe7c96f5',
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
