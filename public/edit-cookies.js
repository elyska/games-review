
const editButton = document.querySelector("aside section > button")
const article1 = document.querySelector("aside article:first-of-type")
const article2 = document.querySelector("aside article:last-of-type")

editButton.addEventListener("click", () => {
    console.log(article2)
    article1.style.display = "none"
    article2.style.display = "block"
})

/*
editButton.addEventListener("click", () => {
    const form = document.createElement("form")
    form.setAttribute("action", "/accept-cookies")
    form.setAttribute("method", "post")

    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("checked", "true")
    checkbox.setAttribute("disabled", "true")
    checkbox.setAttribute("name", "cookie")

    const label = document.createElement("label")
    label.setAttribute("for", "cookie")

    const labelText = document.createTextNode("Strictly necessary cookies")
    
    const br = document.createElement("br")

    const submit = document.createElement("button")
    submit.setAttribute("type", "submit")

    const buttonText = document.createTextNode("Save Preferences")

    label.appendChild(labelText)
    submit.appendChild(buttonText)
    form.appendChild(checkbox)
    form.appendChild(label)
    form.appendChild(br)
    form.appendChild(submit)
    p.appendChild(form)
})*/