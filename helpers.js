
/* helpers.js */

const markdownToHtml = (text) => {
    const newText = Markup.parse(text)
    return newText.content
}

export const helpers = {
    markdownToHtml: markdownToHtml
}