
/* game-form.js */

// display selected year
let rangeInput = document.querySelector("input[type='range']")
let valueParagraph = document.querySelector("main p:nth-of-type(4)")
valueParagraph.innerText = "Selected: " + rangeInput.value

rangeInput.addEventListener("change", () => {
    valueParagraph.innerText = "Selected: " + rangeInput.value
})

// markdown preview
let textbox = document.querySelector("textarea")
let preview = document.querySelector("section > p:last-of-type")

textbox.addEventListener("input", () => {
    preview.innerHTML = marked.parse(textbox.value)
})