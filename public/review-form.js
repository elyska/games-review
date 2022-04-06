
/* review-form.js */

// markdown preview
let textbox = document.querySelector("textarea")
let preview = document.querySelector("main form p:nth-of-type(3)")

textbox.addEventListener("input", () => {
    preview.innerHTML = marked.parse(textbox.value)
})