
/* helpers.js */

import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts'

const markdownToHtml = (text) => {
    const newText = Marked.parse(text)
    return newText.content
}

export const helpers = {
    markdownToHtml: markdownToHtml
}