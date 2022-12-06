const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../../src/models/sales.model");
const salesService = require("../../../src/services/sales.service");
const salesMock = require("./mocks/sales.service.mock");

describe("Testes service de vendas", function() {
    describe("Puxando a lista de vendas", function() {
        before(async function () {
            sinon.stub(salesModel, "getSales").resolves(salesMock.vendas);
        });
        after(async function () {
            sinon.restore();
        });
        it("O retorno da função saleList é um array?", async function () {
            const result = await salesService.saleList();

            expect(result instanceof Array).to.equal(true);
        })
        it("Teste função saleList", async function (){
            const result = await salesService.saleList();

            expect(result).to.be.deep.equal(salesMock.vendas);
        });
    });
});