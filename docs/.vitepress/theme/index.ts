import "./style/vitepress.css";
import "element-plus/dist/index.css";

import DefaultTheme from "vitepress/theme";
import ElementPlus from "element-plus";
// import XmgkComponents from "@template-ui/components";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    app.use(ElementPlus);
    // app.use(XmgkComponents);
  },
};
