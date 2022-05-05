const express = require("express")
const app = express()
const PORT = 3000;

// app.get("/test1", (req, res) => {
//     const test1 = {
//         "text" : "Hello World"
//     }
//     res.send(test1)
// })

// app.get("/test2/:id", (req, res) => {
//     const test2 = {
//         "text" : req.params.id
//     }
//     res.send(test2)
// })

app.use(express.static('public'));

app.use(require("./routes/example"))

app.listen(PORT, () => console.log("Listening on port: " + PORT))
