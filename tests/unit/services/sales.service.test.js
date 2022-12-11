const { expect } = require("chai");
const { func } = require("joi");
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
    describe("Puxando uma venda", function(){
        afterEach(async function(){
            sinon.restore();
        })
        it("O retorno da função saleById é um objeto ?", async function() {
            sinon.stub(salesModel, "getSalesById").resolves(salesMock.venda1);

            const result = await salesService.saleById(1);

            expect(result instanceof Object).to.equal(true);
        });
        it("Teste função saleById",  async function() {
            sinon.stub(salesModel, "getSalesById").resolves(salesMock.venda1);

            const result = await salesService.saleById(1);

            expect(result.message).to.deep.equal(salesMock.venda1);
        })
    })
    describe("Adicionando venda", function() {
        afterEach(async function () {
            sinon.restore();
        });
        it("O retorno da função newSale é um objeto ?", async function() {
            sinon.stub(salesModel, "insertSale").resolves(salesMock.cadastroEntrada);

            const result = await salesService.newSale(salesMock.cadastroEntrada);

            expect(result instanceof Object).to.equal(true);
        });
        it("Teste função newSale", async function(){
            sinon.stub(salesModel, "insertSale").resolves(3);

            const result = await salesService.newSale(salesMock.cadastroEntrada);

            expect(result.message).to.deep.equal(salesMock.cadastroSucesso)
        })
    })
});