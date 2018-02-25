/**
 * Created by yukiX on 2018/02/24.
 */
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({title: 'hi there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
