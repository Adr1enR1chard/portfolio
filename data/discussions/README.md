# Project Detailed Discussions

This folder contains HTML files with detailed technical discussions for each project.

## How to Use

1. Each project has its own HTML file named `{project-id}.html`
2. These files are automatically loaded by the project detail page
3. You can edit these files directly with full HTML formatting, proper indentation, and code blocks

## Files

- `mutiny.html` - Detailed discussion for Mutiny project
- `project-paranoia.html` - Detailed discussion for Project: Paranoïa
- `custom-game-engine.html` - Detailed discussion for Custom ECS Game Engine
- `slade.html` - Detailed discussion for Slade
- `light-and-darkness.html` - Detailed discussion for Light and Darkness

## Formatting

You can use any HTML tags:
- `<h2>`, `<h3>` for headings
- `<p>` for paragraphs
- `<code>` for inline code
- `<pre><code>` for code blocks
- `<ul>`, `<ol>`, `<li>` for lists
- `<strong>`, `<em>` for emphasis
- etc.

### Code Blocks with Syntax Highlighting

To add syntax-highlighted code blocks, use the following format:

```html
<pre><code class="language-cpp">
// Your C++ code here
int main() {
    return 0;
}
</code></pre>
```

Supported languages:
- `language-cpp` for C++
- `language-csharp` for C#
- `language-javascript` for JavaScript
- `language-python` for Python

The syntax highlighting will automatically colorize:
- Keywords (if, for, while, class, etc.)
- Variables and functions
- Strings and numbers
- Comments
- And more!

The CSS styling is already handled by the main stylesheet, so just focus on the content structure!
