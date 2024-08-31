import { Link, RichTextEditor } from "@mantine/tiptap";
import { Document } from "@tiptap/extension-document";
import Highlight from "@tiptap/extension-highlight";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";

// const content =
//   '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export function RichEditor({
  setContent,
  content,
  header = true,
  quote = false,
  listed = true,
  enableMarkdown = true,
  oneLine = false,
}: {
  setContent: (content: string) => void;
  content: string;
  header?: boolean;
  quote?: boolean;
  listed?: boolean;
  enableMarkdown?: boolean;
  oneLine?: boolean;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        ...(header
          ? {}
          : {
              heading: {
                levels: [],
              },
            }),
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      ...(enableMarkdown ? [Markdown] : []),
      ...(oneLine
        ? [
            Document.extend({
              content: "block",
            }),
          ]
        : []),
    ],
    content: content,
  });

  if (!editor) {
    return null;
  }

  editor.on("update", ({ editor }) => {
    // block dont change size of text if heading=false
    setContent(
      enableMarkdown
        ? editor.storage.markdown.getMarkdown().replaceAll(/<\/?u>/g, "__")
        : editor.getHTML(),
    );
  });

  return (
    <RichTextEditor editor={editor}>
      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Link />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            {header && (
              <>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
              </>
            )}
            {listed && <RichTextEditor.BulletList />}
            {quote && <RichTextEditor.Blockquote />}
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
