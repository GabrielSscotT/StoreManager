const { expect } = require("chai");
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
});