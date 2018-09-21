const { join, basename } = require('path');
const glob = require('glob');
const fs = require('fs');
const { getGitLastUpdatedTimeStamp, encodePath } = require('vuepress/lib/prepare/util');
const { parseFrontmatter } = require('vuepress/lib/util');

const readTitleFromMd = path => {
  const lines = fs.readFileSync(path, 'utf8').split('\n').map(l => l.trim());
  const headerLine = lines.find(l => /^#[^#].*$/.test(l));
  const match = headerLine.match(/^#(.*)/);
  if (!match) return;
  return match[1].trim();
};

/**
 * 根据文件路径生成树
 * @param rootPath
 * @param level
 * @returns {*[]}
 */
const generatePathTree = (rootPath, level = 1) => {

  function createDict(rootPath, path, level) {
    let dict = {
      type      : 'dict',
      title     : path,
      path      : encodePath(('/blog/' + rootPath.split('blog')[1] + '/' + path + '/').replace(/\\/g, '/')
                                                                                      .replace(/\/\//g, '/')),
      children  : generatePathTree(join(rootPath, path), level + 1),
      hasContent: false,
      level     : level,
      key       : Math.random().toString(16).slice(2)
    };
    fs.exists(join(rootPath, path, 'README.md'), exists => {
      if (exists) {
        let frontmatter = parseFrontmatter(fs.readFileSync(join(rootPath, path, 'README.md'), 'utf8').split('\n')
                                             .map(l => l.trim())
                                             .join('\n'));
        Object.assign(dict, {
          hasContent : true,
          title      : readTitleFromMd(join(rootPath, path, 'README.md')),
          frontmatter: frontmatter.data,
        });
      }
    });
    return dict;
  }

  function createFile(rootPath, path, level) {
    let frontmatter = parseFrontmatter(fs.readFileSync(join(rootPath, path), 'utf8').split('\n').map(l => l.trim())
                                         .join('\n'));

    return {
      type       : 'file',
      path       : encodePath(('/blog/' + rootPath.split('blog')[1] + '/' + path.replace('.md', '.html'))
                                .replace(/\\/g, '/')
                                .replace(/\/\//g, '/')),
      title      : readTitleFromMd(join(rootPath, path)),
      frontmatter: frontmatter.data,
      level      : level,
      key        : Math.random().toString(16).slice(2)
    };
  }

  let dict = [];
  let file = [];

  fs.readdirSync(rootPath).filter(p => basename(p) !== 'README.md').map((item) => {
    if (fs.statSync(join(rootPath, item)).isDirectory()) {
      dict.push(createDict(rootPath, item, level));
    } else {
      file.push(createFile(rootPath, item, level));
    }
  });

  return dict.concat(file);
};

/**
 * 根据日期生成树
 * @returns {Array}
 */
const generateDateTree = () => {

  function compare(a, b) {
    if (a.date > b.date) {
      return -1;
    } else if (a.date < b.date) {
      return 1;
    } else {
      return 0;
    }
  }

  let files = glob.sync('**/*.md', { cwd: join(__dirname, '..', 'blog') })
                  .map(x => '/blog/' + x);

  files = files.map(file => {
    let frontmatter = parseFrontmatter(fs.readFileSync(join(__dirname, '..', file), 'utf8').split('\n')
                                         .map(l => l.trim()).join('\n'));
    return {
      type       : 'file',
      path       : encodePath(file.replace('.md', '.html').replace('README.html', '')),
      title      : readTitleFromMd(join(__dirname, '..', file)),
      date       : frontmatter.data.date ? new Date(frontmatter.data.date) : new Date(getGitLastUpdatedTimeStamp(join(__dirname, '..', file))),
      frontmatter: frontmatter,
      level      : 3,
      key        : Math.random().toString(16).slice(2)
    };
  });

  files.sort(compare);

  function toTree(files) {

    function createDateDict(title, type) {
      return {
        type      : 'dict',
        title     : `${title}${type === 'year' ? '年' : '月'}`,
        children  : [],
        hasContent: false,
        level     : type === 'year' ? 1 : 2,
        key       : Math.random().toString(16).slice(2)
      };
    }

    let res = [];

    files.map((item) => {
      let year = item.date.getFullYear();
      let month = item.date.getMonth() + 1;

      let yearPos = res.findIndex((v) => {
        return v.title === year + '年';
      });

      if (yearPos === -1) {
        yearPos = res.push(createDateDict(year, 'year')) - 1;
      }

      let monthPos = res[yearPos].children.findIndex((v) => {
        return v.title === month + '月';
      });

      if (monthPos === -1) {
        monthPos = res[yearPos].children.push(createDateDict(month, 'month')) - 1;
      }

      res[yearPos].children[monthPos].children.push(item);
    });

    return res;
  }

  return toTree(files);
};

exports.generatePathTree = generatePathTree;
exports.generateDateTree = generateDateTree;
