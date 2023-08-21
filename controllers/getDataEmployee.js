const getDataEmployee = () => {
    return "SELECT employees.*, departments.name AS department_name FROM employees JOIN departments ON employees.department_id = departments.id";
}

module.exports = getDataEmployee;