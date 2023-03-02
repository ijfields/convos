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
        listItem.innerHTML = `<a href="markdown/${filename}">${filename}</a>`;
        list.appendChild(listItem);
      }
    }
  });
