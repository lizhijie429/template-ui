import DefaultTheme from "vitepress/theme";
// import XmgkComponents from "@template-ui/components";
export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    // app.use(XmgkComponents);
  },
};
