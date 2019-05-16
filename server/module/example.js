const { db } = require("../database/connect")
const exampleSchema = require("../Schema/example");
const objExample = db.model("examples", exampleSchema)

module.exports = objExample;