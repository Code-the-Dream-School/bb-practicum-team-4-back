const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

// Server
const Port = 8000;
const server = app.listen(Port, () => {
        console.log(`Listening on port ${Port}...`);
});

// Order Testing 
describe('Order', () => {
    after(() => {
        server.close();
    });
    describe('post /api/v1/orders', () => {
        it('should not create an order entry without the product information', () => {
            chai
            .request(app)
            .post('/api/v1/orders')
            .send({ bill: 300 })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.eql({ error:'Please enter the products information.' });
            });
        });
        it('should create an order entry with valid inputs', () => {
            chai
            .request(app)
            .post('/api/v1/orders')
            .send({
                products: [{
                    productId: "1",
                    name: "NewProduct",
                    quantity: 3,
                    price: 300
                }],
                bill: 300,
                firstName: "John",
                lastName: "Doe",
                email: "johndoe@gmail.com",
                address: "5678 street drive",
                city: "Raleigh",
                state: "NC",
                zipCode: 12345,
                country: "USA",
                cardHolder: "John Doe",
                cardNumber: 2233,
                expirationMonth: 02,
                expirationYear: 2026,
                ccv: 123
            })
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.include({ msg:'An order entry has been added'});
            });
        });
    });
});


