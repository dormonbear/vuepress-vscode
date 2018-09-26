<template>
  <div class="content-view">
    <div class="article-container">
      <div class="article" ref="article" @mouseenter="onArticleMouseEnter" @mouseleave="onArticleMouseLeave" :style="{width: width + 'px'}">
        <Content class="article-content"></Content>
        <div id="comments-container" class="comments-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import PerfectScrollbar  from "../components/perfect-scrollbar";
  import _                 from 'lodash';
  import PubSub            from 'pubsub-js';
  import { ANCHOR_SCROLL } from "../utils/constants";
  import MD5               from 'md5'

  export default {
    name   : "content-part",
    props  : ['width'],
    data() {
      return {
        ps           : PerfectScrollbar,
        scrollVisible: false,
      };
    },
    mounted() {
      let container = document.querySelector('.article');
      this.ps = new PerfectScrollbar(container);
      container.addEventListener('ps-scroll-y', this.onScroll);

      PubSub.subscribe(ANCHOR_SCROLL, (msg, data) => {
        let target = [].slice.call(document.querySelectorAll('.header-anchor')).find((item) => {
          return item.hash === '#' + encodeURIComponent(data);
        });
        if (target) {
          container.scrollTop = Math.max(
            document.body.scrollTop,
            target.parentElement.offsetTop - 10
          );
        }
      });

      this.renderComment();
    },
    watch  : {
      $page: {
        handler(val, newVal) {
          if (val.path !== newVal.path) {
            document.querySelector(".article").scrollTop = 0;
            document.querySelector('.article').removeChild(document.querySelector('#comments-container'));
            this.renderComment();
            this.ps.update();
          }
        }
      }
    },
    methods: {
      onScroll: _.throttle(function (e) {
        this.setActiveHash(e);
      }, 300),
      setActiveHash(e) {
        const anchors = [].slice.call(document.querySelectorAll('.header-anchor'));

        const scrollTop = Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop,
          e.target.scrollTop
        );

        for (let i = 0; i < anchors.length; i++) {
          const anchor = anchors[i];
          const nextAnchor = anchors[i + 1];

          const isActive = i === 0 && scrollTop === 0 ||
            (scrollTop >= anchor.parentElement.offsetTop + 10 &&
              (!nextAnchor || scrollTop < nextAnchor.parentElement.offsetTop - 10));

          if (isActive && decodeURIComponent(this.$route.hash) !== decodeURIComponent(anchor.hash)) {
            this.$router.replace(decodeURIComponent(anchor.hash));
            return;
          }
        }
      },
      onArticleMouseEnter() {
        this.scrollVisible = true;
        let article = this.$refs.article;
        article.className = article.className.split(" invisible").join("") + " visible";
      },

      onArticleMouseLeave() {
        this.scrollVisible = false;
        let article = this.$refs.article;
        article.className = article.className.split(" visible").join("") + " invisible";
      },
      renderComment() {
        let commentContainerEl = document.createElement('div');
        commentContainerEl.className = 'comments-container';
        commentContainerEl.id = 'comments-container';
        document.querySelector('.article').appendChild(commentContainerEl);
        const Gitalk = require('gitalk');
        new Gitalk(
          {
            clientID    : '122e2ab9330dd3e3a733',
            clientSecret: 'ee0371cf1d498e21ec996fe8628b7760fe7c96f5',
            repo        : 'dormonbear.github.io',
            owner       : 'dormonbear',
            admin       : ['dormonbear'],
            id          : MD5(location.pathname),
          }
        ).render('comments-container');
      }
    }
  };
</script>

<style lang="scss">
  .content-view {
    height : 100%;
    flex   : 1;
  }

  .article-container {
    background-color : rgb(30, 30, 30);
    height           : 100%;

    .article {
      width    : 100%;
      height   : 100%;
      position : relative;
      overflow : hidden;
    }

    .comments-container {
      padding : 30px 26px 0 26px;
      color   : #cccccc !important;
    }
  }

  .article-content {
    user-select              : text;
    -ms-text-size-adjust     : 100%;
    -webkit-text-size-adjust : 100%;
    font-family              : -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size                : 16px;
    padding                  : 0 26px;
    line-height              : 22px;
    word-wrap                : break-word;
  }

  .article-content {
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6,
    > p,
    > blockquote,
    > table,
    ul, 
    ol,
    .extra-class {
      position : relative;

      &:before {
        content     : "";
        display     : block;
        position    : absolute;
        top         : 0;
        height      : 100%;
        left        : -26px;
        opacity     : 0;
        border-left : 3px solid #569cd6;
        transition  : all 0.5s ease;
      }

      &:hover:before {
        left        : -12px;
        opacity     : 1;
      }
    }

    img {
      display    : block;
      max-width  : 100%;
      margin     : 0.5em auto;
      box-shadow : 0 0 0px rgba(0, 0, 0, 0.25);
      transition : box-shadow 0.5s ease;

      &:hover {
        box-shadow : 0 0 100px rgba(0, 0, 0, 0.5);
      }
    }

    a {
      text-decoration : none;
      color           : #007acc;
    }

    a:hover {
      text-decoration : underline;
    }

    a:focus,
    input:focus,
    select:focus,
    textarea:focus {
      outline        : 1px solid -webkit-focus-ring-color;
      outline-offset : -1px;
    }

    hr {
      border        : 0;
      height        : 2px;
      border-bottom : 2px solid;
    }

    h1 {
      padding-bottom      : 0.3em;
      line-height         : 1.2;
      border-bottom-width : 1px;
      border-bottom-style : solid;
    }

    h1,
    h2,
    h3 {
      font-weight : normal;
    }

    h1 code,
    h2 code,
    h3 code,
    h4 code,
    h5 code,
    h6 code {
      font-size   : inherit;
      line-height : auto;
    }

    table {
      border-collapse : collapse;
      width           : 100%;

      .gutter {
        width : 20px;
      }
    }

    table > thead > tr > th {
      text-align    : left;
      border-bottom : 1px solid;
    }

    table > tbody > tr + tr > td {
      border-top : 1px solid;
      word-wrap  : break-word;
    }

    table > thead > tr > th {
      border-color : rgba(255, 255, 255, 0.69);
    }

    h1,
    hr,
    table > tbody > tr + tr > td {
      border-color : rgba(255, 255, 255, 0.18);
    }

    blockquote {
      margin            : 0 7px 0 5px;
      padding           : 0 16px 0 10px;
      border-left-width : 5px;
      border-left-style : solid;
      color             : #57a64a;
      box-shadow        : 2px 2px 2px rgba(0, 0, 0, 0.25);
    }

    code {
      font-family : "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: #ce9178;
    }

    pre[class*="language-"] {
      color       : #ccc;
      background  : none;
      font-family : "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      text-align  : left;
      white-space : pre;
      line-height : 1.5;
      box-shadow  : 1px 1px 1px rgba(0, 0, 0, 0.25);
      transition  : box-shadow 0.5s ease;

      &:hover {
        box-shadow : 3px 3px 3px rgba(0, 0, 0, 0.5);
      }
    }

    pre[class*="language-"] {
      padding  : 1em;
      margin   : 0.5em 0;
      overflow : auto;
      /*white-space : pre;*/
    }

    :not(pre) > code[class*="language-"],
    pre[class*="language-"] {
      background : #2d2d2d;
    }

    :not(pre) > code[class*="language-"] {
      padding       : 0.1em;
      border-radius : 0.3em;
      white-space   : normal;
    }

    .token.block-comment,
    .token.cdata,
    .token.comment,
    .token.doctype,
    .token.prolog {
      color : #6a9955;
    }

    .token.punctuation {
      color : #ccc;
    }

    .token.attr-name,
    .token.deleted,
    .token.namespace,
    .token.tag {
      color : #e2777a;
    }

    .token.function-name {
      color : #6196cc;
    }

    .token.boolean,
    .token.function,
    .token.number {
      color : #f08d49;
    }

    .token.class-name,
    .token.constant,
    .token.property,
    .token.symbol {
      color : #f8c555;
    }

    .token.atrule,
    .token.builtin,
    .token.important,
    .token.keyword,
    .token.selector {
      color : #cc99cd;
    }

    .token.attr-value,
    .token.char,
    .token.regex,
    .token.string,
    .token.variable {
      color : #7ec699;
    }

    .token.entity,
    .token.operator,
    .token.url {
      color : #67cdcc;
    }

    .token.bold,
    .token.important {
      font-weight : 700;
    }

    .token.italic {
      font-style : italic;
    }

    .token.entity {
      cursor : help;
    }

    .token.inserted {
      color : green;
    }

    ::-webkit-scrollbar {
      width  : 10px;
      height : 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color : rgba(121, 121, 121, 0.4);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color : rgba(100, 100, 100, 0.7);
    }

    ::-webkit-scrollbar-thumb:active {
      background-color : rgba(85, 85, 85, 0.8);
    }
  }
</style>
