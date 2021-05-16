const mongoose = require('mongoose');

// define collection schema
const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
})

const Employee = mongoose.model('employee', employeeSchema);

exports.Employee = Employee;
