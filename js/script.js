const itemPerPage = 9
const showPage = (list, page, itemPerPage) => {
    let startIndex = page * itemPerPage - itemPerPage
    let endIndex = page * itemPerPage
    const studentList = document.querySelector(".student-list")
    studentList.innerHTML = ""
    list.forEach((item, index, list) => {
        if (index > startIndex && index < endIndex) {
            studentList.insertAdjacentElement("beforeend", createStudent(item))
        }

    })
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

const createElement = (tagName, classList = "", givenText = "", attr = {}) => {
    const element = document.createElement(tagName)
    if (classList) element.classList.add(...classList)
    const text = document.createTextNode(givenText)
    element.appendChild(text)
    if (Object.keys(attr).length !== 0) {
        for (let attribute in attr) {
            element.setAttribute(attribute, attr[attribute])
        }
    }

    return element
}

showPage(data, 1, itemPerPage)

const addPagination = (list) => {
    const pagesNum = Math.floor(list.length / 9)
    const ul = document.querySelector(".link-list")
    ul.innerHTML = ""
    let i = 0
    while (i < pagesNum) {
        const li = createElement("li")
        const button = createElement("button", "", i + 1, {type: "button"})
        li.appendChild(button)
        ul.appendChild(li)
        i += 1
    }
    const firstButton = ul.firstElementChild.firstElementChild.classList.add("active")

}
addPagination(data)


