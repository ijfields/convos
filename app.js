const markdownElement = document.getElementById('markdown');
/*
function loadMarkdownFile(filename) {
  const url = filename + '.md';

  fetch(url)
    .then(response => response.text())
    .then(text => {
      const html = marked(text);
      markdownElement.innerHTML = html;

      const resizeMessage = {
        type: 'resize',
        height: markdownElement.offsetHeight
      };

      window.parent.postMessage(resizeMessage, '*');
    })
    .catch(error => {
      console.error(error);
    });
}
*/

function loadMarkdown(filename) {
  // Fetch the markdown file and convert it to HTML
  fetch(filename)
    .then(response => response.text())
    .then(text => {
      const converter = new showdown.Converter();
      const html = converter.makeHtml(text);
      markdown.innerHTML = html;
    });
}

function loadMarkdownList() {
  // Get all markdown files from the "markdown" directory
  fetch('markdown/')
    .then(response => response.text())
    .then(text => {
      // Use regex to extract the filenames from the directory listing
      const regex = /<a href="(.*?)">.*?<\/a>/g;
      let match;
      while ((match = regex.exec(text))) {
        const filename = match[1];
        // If the file has the .md extension, add it to the list
        if (filename.endsWith('.md')) {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<a href="javascript:loadMarkdown('markdown/${filename}');">${filename}</a>`;
          list.appendChild(listItem);
        }
      }
    });
}

loadMarkdownList();

window.addEventListener('hashchange', event => {
  const filename = event.newURL.split('#')[1];

  if (filename) {
    loadMarkdownFile(filename);
  }
});

if (window.location.hash) {
  const filename = window.location.hash.substring(1);
  loadMarkdownFile(filename);
}
