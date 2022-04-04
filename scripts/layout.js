const { readFileSync } = require('fs');

hexo.extend.filter.register('before_generate', () => {
    const file = readFileSync('layout/notes.njk').toString();
    hexo.theme.setView('notes.njk', file);
})