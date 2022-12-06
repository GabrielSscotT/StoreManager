const { expect } = require("chai");
const chai = require("chai")
const sinon = require("sinon");

const productsController = require("../../../src/controllers/products.controller");
const productsService = require("../../../src/services/products.service");
const productsMock = require("./mocks/products.controller.mock");

describe("Testes controller de produtos", function() {
    describe("Puxando a lista de produtos", function() {
        before(async function () {
            sinon.stub(productsService, "productList").resolves(productsMock.products);
        });
        after(async function () {
            sinon.restore();
        });
        it("A requisição tem como resultado o código 200?", async function () {
            const req = {}
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.showAllProducts(req, res);

            expect(res.status.calledWith(200)).to.be.true;
        })
        it("Teste função showAllProducts", async function (){
            const req = {}
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.showAllProducts(req, res);

            expect(res.json.calledWith(productsMock.products)).to.be.true;
        });
    });
});