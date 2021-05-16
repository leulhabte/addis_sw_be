const express = require('express');
const route = express.Router();
const {Employee} = require('../model/employees')
const {validateInputs, addEmployee, updateEmployee, removeEmployee} = require('../service/services')

// endpoint to get employees 
route.get('/', async (req, res)=>{
    const employee = await Employee.find()
    if(employee) return res.status(200).json({error: null, data: employee})
    return res.status(204).json({error: null, data: []})
});

// endpoint for creating new employee
route.post('/create', async (req, res)=>{
    const { error } = validateInputs(req.body)
    if(error) return res.status(400).json({error: 'Invalid input provided', data: null})

    const { value, ex } = await addEmployee(req.body)
    if(value) return res.status(201).json({error: null, data: value})

    return res.status(500).json({ error: ex, data: null });
});

// endpoint for updating employee
route.patch('/update', async (req, res)=>{
    const { error } = validateInputs(req.body)
    if(error) return res.status(400).json({error: 'Invalid input provided', data: null})

    const { value, ex } = await updateEmployee(req.query.id, req.body)
    if(value) return res.status(200).json({error: null, data: value})

    return res.status(400).json({ error: ex, data: null });
})

// endpoint for removing employee
route.delete('/remove', async (req, res)=>{
    const { value, ex } = await removeEmployee(req.query.id)
    if(value) return res.status(200).json({error: null, data: value})

    return res.status(400).json({ error: ex, data: null });
});

module.exports = route;