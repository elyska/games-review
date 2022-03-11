
/* helpers.js */

import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts'

const markdownToHtml = (text) => {
    const newText = Marked.parse(text)
    return newText.content
}

const toDate = (timestamp) => {
    const date = timestamp.getDate().toString() + "-" + (timestamp.getMonth() + 1).toString() + "-" + timestamp.getFullYear().toString()
    return date
}

export const helpers = {
    markdownToHtml: markdownToHtml,
    toDate: toDate
}