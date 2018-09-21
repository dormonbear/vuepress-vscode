import Splitview      from '../components/splitview/Splitview';
import SplitviewPanel from '../components/splitview/SplitviewPanel';
import Listview       from '../components/listview/Listview';
import Treeview       from '../components/treeview/treeview';
import SearchView     from '../components/searchview/SearchView';
import store          from '../store';

export default {
  name      : 'navbar-part',
  props     : {
    checkedItem: {
      required: true
    }
  },
  components: {
    Splitview,
    SplitviewPanel,
    Listview,
    Treeview,
    SearchView
  },
  data() {
    return {
      articlesExpanded: store.articlesExpanded,
      outlineExpanded : store.outlineExpanded,
      pathTree        : true
    };
  },
  computed  : {
    articlesHeight() {
      if (!this.articlesExpanded) {
        return 22;
      } else {
        if (!this.outlineExpanded) {
          return this.viewHeight - 35 - 22 * 2;
        } else {
          return 440;
        }
      }
    },
    outlineHeight() {
      if (!this.outlineExpanded) {
        return 22;
      } else {
        return this.viewHeight - this.articlesHeight - 35 - 22;
      }
    },
    outlineTreeData() {
      if (!this.$page.headers) return [];
      return this.$page.headers.map((item) => {
        return {
          type      : 'header',
          title     : item.title,
          slug      : item.slug,
          hasContent: false,
          level     : item.level,
          path      : this.$page.path + '#' + item.slug,
          key       : this.$page.key + item.level + item.title
        };
      });
    }
  },
  methods   : {
    toggleArticlesExpanded() {
      this.articlesExpanded = !this.articlesExpanded;
      store.articlesExpanded = this.articlesExpanded;
    },
    toggleOutlineExpanded() {
      this.outlineExpanded = !this.outlineExpanded;
      store.outlineExpanded = this.outlineExpanded;
    },
    toggleSwitch() {
      this.pathTree = !this.pathTree;
    }
  }
};
