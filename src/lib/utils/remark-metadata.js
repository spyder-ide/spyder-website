export function remarkMetadata() {
  return function (tree, file) {
    // Get the frontmatter data from the markdown file
    const { data } = file;
    
    if (!data.fm) {
      console.warn('No frontmatter found in markdown file');
      return;
    }

    // Ensure tags is always an array
    if (typeof data.fm.tags === 'string') {
      data.fm.tags = data.fm.tags.split(',').map(tag => tag.trim());
    } else if (!Array.isArray(data.fm.tags)) {
      data.fm.tags = [];
    }

    // Ensure author is properly formatted
    if (typeof data.fm.author === 'string') {
      data.fm.author = [data.fm.author];
    } else if (!Array.isArray(data.fm.author)) {
      data.fm.author = [];
    }

    // Add the metadata to the file's data
    Object.assign(file.data, data.fm);
  };
} 
