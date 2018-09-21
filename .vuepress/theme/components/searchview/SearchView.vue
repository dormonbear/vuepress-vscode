<template>
  <div class="search-view">
    <div class="search-widgets-container">
      <div class="search-widget">
        <div class="search-container">
          <div class="search-input">
            <div class="input-box">
              <div class="wrapper">
                <input v-model="searchInput" id="algolia-search-input" @keyup.enter="handleSearch" class="input" autocorrect="off"
                       autocapitalize="off" spellcheck="false"
                       type="text" wrap="off"
                       placeholder="搜索" title="搜索">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="messages" v-show="result.length">
      <div class="message">
        <p>{{ result.length }} 个结果</p>
      </div>
    </div>
    <div class="results" :style="{height: `${viewHeight - 113}px`}">
      <treeview :treeData="result" name="search-treeview"></treeview>
    </div>
  </div>
</template>

<script>
  import Treeview         from '../treeview/treeview';

  export default {
    components: {
      Treeview
    },
    data() {
      return {
        searchInput: '',
        result     : [],
      };
    },
    methods   : {
      handleSearch() {
        const query = this.searchInput.trim().toLowerCase();
        if (!query) {
          return;
        }
        const { pages } = this.$site;
        const localePath = this.$localePath;
        const matches = item => (
          item.title &&
          item.title.toLowerCase().indexOf(query) > -1
        );
        const res = [];
        for (let i = 0; i < pages.length; i++) {
          const p = pages[i];
          if (this.getPageLocalePath(p) !== localePath) {
            continue;
          }
          let pos;
          if (matches(p)) {
            pos = res.push(
              {
                type       : 'file',
                path       : p.path,
                title      : p.title,
                frontmatter: p.frontmatter,
                level      : 1,
                key        : p.key
              }
            ) - 1;
          }
          if (p.headers) {
            for (let j = 0; j < p.headers.length; j++) {
              const h = p.headers[j];
              if (matches(h)) {
                if (!pos) {
                  pos = res.push(
                    {
                      type       : 'dict',
                      path       : p.path,
                      title      : p.title,
                      frontmatter: p.frontmatter,
                      level      : 1,
                      key        : p.key,
                      children   : []
                    }
                  ) - 1;
                } else {
                  res[pos].children = [];
                  res[pos].type = 'dict';
                }
                res[pos].children.push(
                  {
                    type      : 'header',
                    title     : h.title,
                    slug      : h.slug,
                    hasContent: false,
                    level     : 2,
                    path      : p.path + '#' + h.slug,
                    key       : p.key + 2 + h.title
                  }
                );
              }
            }
          }
        }
        this.result = res;
      },
      getPageLocalePath(page) {
        for (const localePath in this.$site.locales || {}) {
          if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
            return localePath;
          }
        }
        return '/';
      }
    }
  };
</script>

<style lang="scss" scoped>

  a {
    text-decoration : none;
    color           : #cccccc;
  }

  .search-view {
    font-size : 12px;
    .search-widgets-container {
      margin      : 0 9px 0 2px;
      padding-top : 6px;
      .search-widget {
        position : relative;
        .search-container {
          height      : 25px;
          margin-left : 7px;
          .search-input {
            width          : 100%;
            display        : inline-block;
            vertical-align : middle;
            .input-box {
              background-color : rgb(60, 60, 60);
              color            : rgb(204, 204, 204);
              height           : 25px;
              border           : 1px solid transparent;
              font-size        : 13px;
              width            : 100%;
              position         : relative;
              display          : block;
              padding          : 0;
              -o-box-sizing    : border-box;
              -ms-box-sizing   : border-box;
              box-sizing       : border-box;
              line-height      : auto !important;
              .wrapper {
                position : relative;
                width    : 100%;
                height   : 100%;
                .input {
                  width            : 159px;
                  background-color : rgb(60, 60, 60);
                  color            : rgb(204, 204, 204);
                  display          : inline-block;
                  -o-box-sizing    : border-box;
                  -ms-box-sizing   : border-box;
                  box-sizing       : border-box;
                  width            : 100%;
                  height           : 100%;
                  line-height      : inherit;
                  border           : none;
                  font-family      : inherit;
                  font-size        : inherit;
                  resize           : none;
                  color            : inherit;
                  padding          : 4px;
                  text-overflow    : ellipsis;
                }
              }
            }
          }
        }
      }
    }
    .messages {
      margin-top : 5px;
      cursor     : default;
      .message {
        opacity       : .5;
        padding-left  : 22px;
        padding-right : 22px;
        padding-top   : 0;
        text-align    : center;
        p {
          margin-top     : 0;
          margin-bottom  : 0;
          padding-bottom : 4px;
          user-select    : text;
        }
      }
    }
  }
</style>
