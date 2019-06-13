module.exports = {
    generatePageItems: (pageNumber, actualPage) => {
        let pageIndexes = Array.apply(null, { length: pageNumber })
            .map(Number.call, Number);

        let selectedPages = pageIndexes.slice(Math.max(actualPage - 2, 0), Math.min(actualPage + 3, pageNumber));
        let begin, end;
        if (selectedPages[0] !== 0) {
            begin = [{
                content: 1,
                classes: 'btn btn-secondary',
                url: '/?page=1'
            }, {
                content: '...',
                classes: 'btn btn-secondary disabled',
                url: '#'
            }];
        } else {
            begin = [];
        }

        if (selectedPages[selectedPages.length - 1] !== pageNumber - 1) {
            end = [{
                content: '...',
                classes: 'btn btn-secondary disabled',
                url: '#'
            }, {
                content: pageNumber,
                classes: 'btn btn-secondary',
                url: '/?page=' + pageNumber
            }];
        } else {
            end = [];
        }

        let mappedPages = selectedPages.map(num => {
            return {
                content: num + 1,
                classes: num === actualPage ? 'btn btn-secondary active' : 'btn btn-secondary',
                url: '/?page=' + (num + 1)
            }
        });
        return begin.concat(mappedPages).concat(end);
    }
}