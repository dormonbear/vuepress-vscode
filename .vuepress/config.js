const { generatePathTree, generateDateTree } = require('./utils');

module.exports = {
  title           : 'Dormon',
  description     : 'Nothing but nonsense',
  ga              : 'UA-77792706-2',
  head            : [
    ['link', {
      rel : 'icon',
      href: `/favicon.jpg`
    }],
  ],
  markdown        : {
    config: md => {
      md.use(require('markdown-it-katex'));
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': require('path').join(__dirname, '..', 'images')
      }
    }
  },
  themeConfig     : {
    lastUpdated: 'Last Updated',
    pathTree   : generatePathTree(require('path').join(__dirname, '..', 'blog')),
    dateTree   : generateDateTree(),
  }
};
