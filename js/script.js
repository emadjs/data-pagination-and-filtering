const studentList = document.querySelector(".student-list")
const linkList = document.querySelector(".link-list")
const header = document.querySelector(".header")
const studentsPerPage = 9

const createElement = (tagName, classList = "", givenText = "", attr = {}) => {
    const element = document.createElement(tagName)
    if (classList) element.classList.add(...classList)
    if (givenText) {
        const text = document.createTextNode(givenText)
        element.appendChild(text)
    }
    if (Object.keys(attr).length !== 0) {
        for (let attribute in attr) {
            element.setAttribute(attribute, attr[attribute])
        }
    }
    return element
}

const createStudent = (student) => {

    const li = createElement("li", ["student-item", "cf"])

    const firstDiv = createElement("div", ["student-details"])
    const img = createElement("img", ["avatar"], null, {
        src: student.picture.large, alt: "Profile Picture"
    })
    const h3 = createElement("h3", "", `${student.name.first} ${student.name.last}`)
    const span = createElement("span", ["email"], student.email)
    firstDiv.appendChild(img)
    firstDiv.appendChild(h3)
    firstDiv.appendChild(span)

    const secondDiv = createElement("div", ["joined-details"])
    const secondSpan = createElement("span", ["date"], `Joined ${student.registered.date}`)
    secondDiv.appendChild(secondSpan)

    li.appendChild(firstDiv)
    li.appendChild(secondDiv)
    return li
}

const showPage = (list, page) => {
    const startIndex = (page * studentsPerPage) - studentsPerPage
    const endIndex = page * studentsPerPage
    studentList.innerHTML = ""
    list.forEach((item, index, list) => {
        if (index >= startIndex && index < endIndex) {
            studentList.insertAdjacentElement("beforeend", createStudent(item))
        }
    })
}

const addPagination = (list) => {
    const numOfPages = Math.ceil(list.length / studentsPerPage)
    linkList.innerHTML = ""
    let i = 1
    while (i <= numOfPages) {
        const li = createElement("li")
        const button = createElement("button", "", i, {type: "button"})
        li.appendChild(button)
        linkList.appendChild(li)
        i += 1
    }
    const firstButton = linkList.firstElementChild.firstElementChild.classList.add("active")
    linkList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const clickedButton = e.target
            const activeButton = document.querySelector(".active")

            activeButton.classList.remove("active")
            clickedButton.classList.add("active")

            showPage(list, clickedButton.textContent)
        }
    })
}

const handler = (data) => {
    showPage(data, 1)
    addPagination(data)
}


handler(data)
