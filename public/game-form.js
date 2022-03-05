
/* game-form.js */

let rangeInput = document.querySelector("input[type='range']")
let valueParagraph = document.querySelector("main p:nth-of-type(4)")
valueParagraph.innerText = "Selected: " + rangeInput.value

rangeInput.addEventListener("change", () => {
    valueParagraph.innerText = "Selected: " + rangeInput.value
})