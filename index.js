const express = require('express');
require('dotenv').config();
var cors = require('cors')

const dbConnection = require('./database/config');

const app = express();

dbConnection();

app.use(cors());


app.use( express.static('public' ) );


app.use( express.json());

app.use('/api/auth' , require('./routes/auth'));
app.use('/api/events' , require('./routes/events'));


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen( process.env.PORT, () => {
    console.log( `Server running on port ${ process.env.PORT }` );
});