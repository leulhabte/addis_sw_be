const { Employee } = require('../model/employees')
const Joi = require('joi')

// function for validating the provided input
function validateInputs(objectBody) {
    const schema = Joi.object({
        name: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        gender: Joi.string().valid('Male', 'Female'),
        salary: Joi.number().required(),
    })

    return schema.validate(objectBody)
}

// funtion for adding new employees
async function addEmployee(newEmployee){
    try{
        const insertData = await Employee(newEmployee).save();
        return {value: insertData, ex: null}
    }catch (ex) {
        return {value: null, ex: ex.message}
    }
}

// function for updating employee data
async function updateEmployee(id, data) {
    try{
        const employee = await Employee.findById(id)
        if(employee){
            employee.name = data.name;
            employee.dateOfBirth = data.dateOfBirth;
            employee.gender = data.gender;
            employee.salary = data.salary;
    
            const saveData = await employee.save();
            return {value: saveData, ex: null}
        }else{
            return { value: null, ex: 'User not found'}
        }
    }catch (ex){
        return { value: null, ex: ex.message}
    }
}

// function for removing employee data
async function removeEmployee(id) {
    const remove = await Employee.deleteOne({_id: id},{new: true})
    console.log(remove);
    if(remove){
        return {value: remove, ex: null}
    }else{
        return { value: null, ex: 'Employee not found'}
    }
}


exports.addEmployee = addEmployee;
exports.validateInputs = validateInputs;
exports.updateEmployee = updateEmployee;
exports.removeEmployee = removeEmployee;