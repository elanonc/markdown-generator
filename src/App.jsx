import { useState } from 'react';
import { marked } from 'marked';
import Prism from 'prismjs';

import './App.css';

const defaultContent = `

# Ola, 
## Bem vindo
### FreeCodeCamp


\`<div>Inline code</div>\`

\`\`\`
const multipleLineCode = (param) => {
    if(param) {
        return param
    }
}
\`\`\`

**Some bold text**

[Visit My Channel](https://www.youtube.com/channel/UCyfz7O4EsWUwpnrcuOyG6VA)

> Block Quot

1. First list item
2. Second list item
`

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const Editor = ({ content, handleTextareaChange }) => 
  <textarea value={content} onChange={handleTextareaChange} id="editor" />

const Previewer = ({content}) => (
  <div id="preview" 
    dangerouslySetInnerHTML={{
      __html: marked(content, { renderer: renderer })
    }}
  />
);

export function App() {
  const [content, setContent] = useState(defaultContent);
  
  const handleTextareaChange = (event) => {
    setContent(event.target.value)
  }

  return (
    <div class="app">
      <Editor content={content} handleTextareaChange={handleTextareaChange} />
      <Previewer content={content} />
    </div>
  )
}