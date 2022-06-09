const express = require('express');
const FAQ = require('./Models/FAQ');
const app = express();
const cors = require('cors');
require('dotenv/config')
require('./conn');

app.use(cors());
app.use(express.json());

app.post("/newentry", async (req, res) => {
    try {
        const { question, answer } = req.body;
        console.log(question, answer);

        const entry = new FAQ({
            question: question,
            answer: answer
        })
        console.log(entry)

        const data = await entry.save();

        console.log(data);
        return res.send("New Entry Added Successfully");
    } catch (err) {
        console.log(err)
    }
})
app.post("/findans", async (req, res) => {
    try {
        const { question } = req.body;
        console.log(question);
        const regex = new RegExp(question, 'i');
        FAQ.findOne({ question: regex }, { answer: 1 }).then((result) => {
            if (!result) {
                return res.status(200).send({ answer: "Chatbot is not able to comprehend user conversation", data: Date.now })
            }
            return res.send(result)
        }).catch((err) => {
            return res.status(200).send({ answer: "Chatbot is not able to comprehend user conversation", data: Date.now })
        })

    } catch (err) {
        console.log(err);
        return res.status(400).send("something went worng!!");
    }
})


app.listen(5000, () => {
    console.log("App is listening on port no. 5000");
})
