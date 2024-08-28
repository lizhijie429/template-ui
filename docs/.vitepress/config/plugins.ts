import MarkdownIt from "markdown-it";
// import MarkdownItContainer from 'markdown-it-container'
import TableContainer from "./table";
// import type { Token } from 'markdown-it'

// https://markdown-it.docschina.org/#%E7%94%A8%E6%B3%95%E7%A4%BA%E4%BE%8B
// https://juejin.cn/post/6844903688536850440
const markdown: MarkdownIt = MarkdownIt({
  breaks: true,
});

export const mdPlugin = (md: MarkdownIt) => {
  md.use(TableContainer);
};
