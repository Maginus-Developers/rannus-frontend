import { defaultRules, inlineRegex } from "simple-markdown";

import { MarkdownRule } from "../helpers";

const MENTION_RE = /^(#+) (.+)/g;

export const heading: MarkdownRule = {
  order: defaultRules.heading.order,
  match: inlineRegex(MENTION_RE),
  parse: (capture, parse, state) => {
    const [, level, content] = capture;
    if (level.length > 3) {
      return {
        content: parse(content.trim(), state),
        level: 3,
      };
    }
    return {
      content: parse(content.trim(), state),
      level: level.length,
    };
  },
  react: (node, output, state) => {
    let textSize = "text-xl";
    if (node.level === 2) textSize = "text-lg";
    if (node.level === 3) textSize = "text-base";
    return (
      <div key={state.key} className={`font-bold ${textSize}`}>
        {output(node.content, state)}
      </div>
    );
  },
};
