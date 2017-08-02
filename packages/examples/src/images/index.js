import m from "mithril";
import { github } from "../app/github";
import infinite from "mithril-infinite";

import { addStyle } from "../app/styler";
import styles from "./styles";
addStyle("images", styles);

const IMG_URL = "http://arthurclemens.github.io/assets/mithril-infinite-scroll/thumbs/";

const getData = page =>
  m.request({
    method: "GET",
    url: "data/images/page-" + page + ".json"
  });

let vm = {
  expanded: {},
  dirty: {},
  toggle: id => {
    if (vm.expanded[id]) {
      delete vm.expanded[id];
    } else {
      vm.expanded[id] = 1;
    }
    vm.dirty[id] = 1;
  },
  isExpanded: id => vm.expanded[id],
  isDirty: id => vm.dirty[id],
  clearDirty: id => delete vm.dirty[id]
};

let item = (data, opts) => {
  const id = opts.pageNum + data.src;
  const isExpanded = vm.isExpanded(id);
  const isDirty = vm.isDirty(id);
  const heightFraction = isExpanded ? 0.5 : 0.25;

  return m("a.list-item", {
    style: {
      height: (parseFloat(data.height) * heightFraction) + "px"
    },
    onclick: () => {
      vm.toggle(id);
    }
  }, [
    m("span.pageNum", opts.pageNum),
    m(".image", {
      style: {
        height: (parseFloat(data.height) * heightFraction) + "px",
        width: (parseFloat(data.width) * heightFraction) + "px"
      },
      config: (el, inited, context) => {
        if (context.inited && !isDirty) {
          return;
        }
        if (infinite.isElementInViewport({ el })) {
          const url = IMG_URL + data.src;
          el.style.backgroundImage = el.style.backgroundImage = "url(" + url + ")";
          context.inited = true;
          vm.clearDirty(id);
        }
      }
    }),
    // minus or plus sign
    m(".toggle", isExpanded ? m.trust("&#150;") : m.trust("&#43;"))
  ]);
};

export default {
  controller: () => {
    const pageData = p => 
      getData(p).then((response) => (
        response
      ));
    return {
      pageData
    };
  },
  view: (ctrl) =>
    m(infinite, {
      maxPages: 20,
      item: item,
      // pageUrl: pageNum => "data/images/page-" + pageNum + ".json", // this is an alternative, simpler way
      pageData: ctrl.pageData, // fetches data
      preloadPages: 3,
      class: "images",
      before: m("a", {
        class: [
          "list-item",
          vm.isExpanded("before") ? "open" : "closed"
        ].join(" "),
        onclick: () => {
          vm.toggle("before");
        }
      }, [
        m("div", m.trust("A list of pugs. Courtesy the <a href=\"http: //airbnb.io/infinity/demo-off.html\">AirBnb Infinity demo</a>.")),
        m(".toggle", vm.isExpanded("before") ? m.trust("&#150;") : m.trust("&#43;"))
      ]),
      after: github(),
      pageChange: page => {
        if (console) {
          console.log("page", page); // eslint-disable-line no-console
        }
      }
    })
};
