function getAverage(grades) {
    grades = grades.map((grade) => {
        return parseInt(grade, 10)
    })
    let sum = 0
    for (let i = 0; i < grades.length; i++) {
        sum += grades[i]
    }
    return parseFloat(sum / grades.length)
}

export default getAverage
