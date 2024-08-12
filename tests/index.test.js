const chai = require('chai');
const chaiHttp = require('chai-http');
// const sinon = require('sinon');
const app = require('../index.js');
const { employees } = require('../src/employees'); // Import your dummy employee array

chai.use(chaiHttp);
const { expect } = chai;

describe('Employee Management System', () => {

    // GET /employees
    describe('GET /employees', () => {
        it('should return all employees', (done) => {
            chai.request(app)
                .get('/employees')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // GET /employees/:id
    describe('GET /employees/:id', () => {
        it('should return a single employee by ID', (done) => {
            const employeeId = 1; // Adjust ID as needed
            chai.request(app)
                .get(`/employees/${employeeId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id', employeeId);
                    done();
                });
        });

        it('should return 404 if employee is not found', (done) => {
            const employeeId = 999; // Non-existing ID
            chai.request(app)
                .get(`/employees/${employeeId}`)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });

    // POST /employees
    describe('POST /employees', () => {
        it('should create a new employee', (done) => {
            const newEmployee = { id:6,name: 'Alice', department: 'Finance',salary:30000 };
            chai.request(app)
                .post('/employees/add')
                .send(newEmployee)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('name', 'Alice');
                    done();
                });
        });
    });

    // PUT /employees/:id
    describe('PUT /employees/:id', () => {
        it('should update an existing employee', (done) => {
            const employeeId = 1; // Adjust ID as needed
            const updatedEmployee = { name: 'John Doe', department: 'HR' };
            chai.request(app)
                .put(`/employees/${employeeId}`)
                .send(updatedEmployee)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('name', 'John Doe');
                    done();
                });
        });
    });

    // DELETE /employees/:id
    describe('DELETE /employees/:id', () => {
        it('should delete an employee by ID', (done) => {
            const employeeId = 1; // Adjust ID as needed
            chai.request(app)
                .delete(`/employees/${employeeId}`)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

});

