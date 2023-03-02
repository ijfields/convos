const markdownElement = document.getElementById('markdown');

function loadMarkdown(filename) {
  // Fetch the markdown file and convert it to HTML
  fetch(filename)
    .then(response => response.text())
    .then(text => {
      const converter = new showdown.Converter();
      const html = converter.makeHtml(text);
      markdownElement.innerHTML = html;
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
          listItem.innerHTML = `<a href="#markdown/${filename}">${filename}</a>`;
          list.appendChild(listItem);
        }
      }
    });
}

loadMarkdownList();

window.addEventListener('hashchange', event => {
  const filename = event.newURL.split('#markdown/')[1];

  if (filename) {
    loadMarkdown(`markdown/${filename}`);
  }
});

if (window.location.hash) {
  const filename = window.location.hash.split('#markdown/')[1];
  loadMarkdown(`markdown/${filename}`);
}
