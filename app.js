const markdownElement = document.getElementById('markdown');

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
