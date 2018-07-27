
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const marked = require('marked');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true
});
app.set('port', process.env.PORT || 3000);
app.post('/markdown', (req, res) => {
    const payload = {
        markdown: marked(req.body.text || "", { sanitize: true })
    }
    pusher.trigger('markdown', 'new-text', payload);
    res.send(payload)
})
app.listen(app.get('port'), () => {
    console.log("Server started on " + app.get('port'));
})