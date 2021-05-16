const express = require('express');
const employee = require('./api/routes/employee')

// initializing express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/employee', employee);

// handles undefind routes
app.use('*', (req, res)=>{
    return res.status(404).json({
        error: 'Not found',
        data: null
    })
});

// catch any kind of errors
app.use((error, req, res, next)=>{
    res.status(500).json({error: error.message});
})

module.exports = app;