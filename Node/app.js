const chalk = require("chalk")
const hash = require("object-hash")

console.log(chalk.red(__dirname))

const arr = [1, 2, 3]
const arr1 = [1, 2, 3, 4]

console.log(hash(arr) === hash(arr1))
