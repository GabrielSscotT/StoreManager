const { expect } = require("chai");
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
    describe("Puxando um produto", function() {
        afterEach(async function() {
            sinon.restore();
        });
        it("A requisição tem como resultado o código 200?", async function () {
            sinon
              .stub(productsService, "productById")
              .resolves({ type: null, message: productsMock.products[0] });

            const req = { params: { id: 1 } }
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.showProductById(req, res);

            expect(res.status.calledWith(200)).to.be.true;
        });
        it("Teste função showProductsById", async function() {
            sinon
              .stub(productsService, "productById")
              .resolves({ type: null, message: productsMock.products[0] });

            const req = { params: { id: 1 } }
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.showProductById(req, res);

            expect(res.json.calledWith(productsMock.products[0])).to.be.true
        });
        it("Se não encontrar produto chama o código 404", async function() {
            sinon
              .stub(productsService, "productById")
              .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

            const req = { params: { id: 999 } }
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.showProductById(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Product not found" })).to.be.true;
        })
    })
    describe("Adicionando Produto", function() {
        afterEach(async function() {
            sinon.restore();
        });
        it("A requisição tem como resultado o código 201?", async function(){
            sinon
            .stub(productsService, "newProduct")
            .resolves({ type: null, message: productsMock.productAddResult})

            const req = { body: productsMock.productName }
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.addNewProduct(req, res);

            expect(res.status.calledWith(201)).to.be.true;
        })
        it("Teste função addNewProduct", async function(){
            sinon
            .stub(productsService, "newProduct")
            .resolves({ type: null, message: productsMock.productAddResult})

            const req = { body: productsMock.productName }
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.addNewProduct(req, res);

            expect(res.json.calledWith(productsMock.productAddResult)).to.be.true
        })
    })
    describe("Deletando produto", function() {
        afterEach(async function() {
            sinon.restore();
        })
        it("A requisição tem como resultado o código 204?", async function(){
            sinon
            .stub(productsService, "deleteProduct")
            .resolves({ type: null})

            const req = { params: { id: 1 } }
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.deleteProductById(req, res);

            expect(res.status.calledWith(204)).to.be.true;
        })
        it("Teste função deleteProductById", async function(){
            sinon
            .stub(productsService, "deleteProduct")
            .resolves({ type: null})

            const req = { params: { id: 1 } }
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.deleteProductById(req, res);

            expect(res.json.calledWith()).to.be.true;
        })
    })    
});