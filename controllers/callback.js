var renderTitleH1 = function (title) {
    var tagBody = document.querySelector('body');
    tagBody.innerHTML = `<h1>${title}</h1>`
}

var main = function (callback) {
    callback('Mai')
}

main(renderTitleH1);