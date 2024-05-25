const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Directory where question sets will be saved
const questionSetsDir = path.join(__dirname, 'question-sets');

// Ensure the directory exists
if (!fs.existsSync(questionSetsDir)) {
    fs.mkdirSync(questionSetsDir);
}

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/save-question-set', (req, res) => {
    const { setName, questions } = req.body;
    const filePath = path.join(questionSetsDir, `${setName}.json`);

    if (fs.existsSync(filePath)) {
        // Append to the existing file
        const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        existingData['Single Correct Answer Type'].push(...questions['Single Correct Answer Type']);
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    } else {
        // Create a new file
        fs.writeFileSync(filePath, JSON.stringify(questions, null, 2));
    }

    res.status(200).send({ message: 'Question set saved successfully.' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
