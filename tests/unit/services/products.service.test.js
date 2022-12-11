const { expect } = require("chai");
const { isRef } = require("joi");
const sinon = require("sinon");

const productsModel = require("../../../src/models/products.model");
const productsService = require("../../../src/services/products.service");
const productsMock = require("./mocks/products.service.mock");

describe("Testes service de produtos", function() {
    describe("Puxando a lista de produtos", function() {
        before(async function () {
            sinon.stub(productsModel, "findAll").resolves(productsMock.products);
        });
        after(async function () {
            sinon.restore();
        });
        it("O retorno da função productList é um array?", async function () {
            const result = await productsService.productList();

            expect(result instanceof Array).to.equal(true);
        })
        it("Teste função productList", async function (){
            const result = await productsService.productList();

            expect(result).to.be.deep.equal(productsMock.products);
        });
    });

    describe("Puxando um produto", function() {
        afterEach(async function () {
            sinon.restore();
        });
        it("O retorno da função productById é um objeto ?", async function() {
            sinon.stub(productsModel, "findById").resolves(productsMock.products[0]);

            const result = await productsService.productById(1);

            expect(result instanceof Object).to.equal(true);
        });
        it("Teste função productById",  async function() {
            sinon.stub(productsModel, "findById").resolves(productsMock.products[0]);

            const result = await productsService.productById(1);

            expect(result.message).to.deep.equal(productsMock.products[0]);
        })
        it("Existe um erro se não existir um produto com ID específico no banco de dados", async function() {
            const INVALID_ID = 999;
            sinon.stub(productsModel, "findById").resolves(productsMock.products[INVALID_ID]);

            const result = await productsService.productById(INVALID_ID);

            expect(result.message).to.deep.equal("Product not found");
        });
    });
    describe("Adicionando produto", function() {
        afterEach(async function () {
            sinon.restore();
        });
        it("O retorno da função newProduct é um objeto ?", async function() {
            sinon.stub(productsModel, "addNew").resolves(productsMock.productName);

            const result = await productsModel.addNew(productsMock.productName);

            expect(result instanceof Object).to.equal(true);
        });
        it("Teste função newProduct",  async function() {
            sinon.stub(productsModel, "addNew").resolves(4);

            const result = await productsService.newProduct('Produto1');

            expect(result.message).to.deep.equal(productsMock.productAddResult);
        })
    })
    describe("Deletando produto", function() {
        afterEach(async function() {
            sinon.restore();
        })
        it("Teste função deleteProduct", async function() {
            sinon.stub(productsModel, "deleteProduct").resolves();

            const result = await productsService.deleteProduct(1);

            expect(result.type).to.deep.equal(null);
        })
    })
});