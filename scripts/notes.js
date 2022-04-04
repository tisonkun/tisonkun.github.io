hexo.extend.generator.register('notes', function(locals) {
    let notes = [];
    for (let i = 0; i < locals.pages.data.length; i++) {
        let page = locals.pages.data[i];
        if (page.source.startsWith('notes/')) {
            notes.push(page);
        }
    }

    return {
        path: 'notes/index.html',
        data: { posts: notes },
        layout: 'notes'
    }
});
