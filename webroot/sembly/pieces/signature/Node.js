const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

const dataFile = 'subscribers.json';

// Чтение данных из файла
function loadSubscribers() {
    if (fs.existsSync(dataFile)) {
        return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
    }
    return [];
}

// Сохранение данных в файл
function saveSubscribers(subscribers) {
    fs.writeFileSync(dataFile, JSON.stringify(subscribers, null, 2));
}

// Проверка, что email уникален
app.post('/subscribe', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required.' });
    }

    const subscribers = loadSubscribers();
    const emailExists = subscribers.some(subscriber => subscriber.email === email);

    if (emailExists) {
        return res.status(400).json({ message: 'Email is already subscribed.' });
    }

    // Добавление нового подписчика
    subscribers.push({ name, email });
    saveSubscribers(subscribers);

    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


