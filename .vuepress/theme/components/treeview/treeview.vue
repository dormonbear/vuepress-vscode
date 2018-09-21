<script>
  import TreeViewItem     from "./treeview-item";
  import PerfectScrollbar from "../perfect-scrollbar";

  export default {
    props     : {
      name    : {
        required: true
      },
      treeData: {
        required: true
      }
    },
    components: {
      TreeViewItem
    },
    data() {
      return {
        ps           : PerfectScrollbar,
        scrollVisible: false
      };
    },
    mounted() {
      let container = document.querySelector("." + this.name);
      this.ps = new PerfectScrollbar(container);
    },
    render(h) {
      let self = this;

      function renderDeepTree(treeData, h) {
        let res = [];
        for (let i = 0; i < treeData.length; i++) {
          res.push(
            h(
              'tree-view-item', {
                props: {
                  treeItemData: treeData[i]
                },
                on   : {
                  expandedStateChanged() {
                    self.ps.update();
                  }
                }
              },
              treeData[i].type === 'dict' ? renderDeepTree(treeData[i].children, h) : []
            )
          );
        }
        return res;
      }

      return h(
        "div",
        {
          class: ["tree-wrapper"],
        },
        [
          h("div", {
              class: ["tree-rows", this.name],
              ref  : "treeRows",
              on   : {
                mouseenter: this.onTreeRowsMouseEnter,
                mouseleave: this.onTreeRowsMouseLeave
              }
            },
            renderDeepTree(self.treeData, h))
        ]
      );
    },
    methods   : {
      onTreeRowsMouseEnter() {
        this.scrollVisible = true;
        let treeRows = this.$refs.treeRows;
        treeRows.className =
          treeRows.className.split(" invisible").join("") + " visible";
      },

      onTreeRowsMouseLeave() {
        this.scrollVisible = false;
        let treeRows = this.$refs.treeRows;
        treeRows.className =
          treeRows.className.split(" visible").join("") + " invisible";
      }
    }
  };
</script>
