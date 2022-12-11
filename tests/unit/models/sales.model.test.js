const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/sales.model")

const salesMock = require("./mocks/sales.model.mock");

describe("Testes model de vendas", function(){
    describe("Puxando a lista de vendas", function() {
        before(async function(){
            sinon.stub(connection, "execute").resolves([salesMock.vendas]) 
        });
        after(async function(){
            connection.execute.restore();
        })
        it("Teste função getSales", async function() {
            const result = await salesModel.getSales();

            expect(result).to.be.deep.equal([
                {
                  "saleId": 1,
                  "date": "2021-09-09T04:54:29.000Z",
                  "productId": 1,
                  "quantity": 2
                },
                {
                  "saleId": 1,
                  "date": "2021-09-09T04:54:54.000Z",
                  "productId": 2,
                  "quantity": 2
                }
            ]);
        });
    });
    describe("Puxando uma venda", function() {
        before(async function () {
            sinon.stub(connection, "execute").resolves(salesMock.venda1);
        })
        after(async function() {
            connection.execute.restore();
        })
        it("Teste função getSalesById", async function() {
            const result = await salesModel.getSalesById(1);

            expect(result).to.be.deep.equal(
                {
                  "date": "2021-09-09T04:54:29.000Z",
                  "productId": 1,
                  "quantity": 2
                },
                {
                  "date": "2021-09-09T04:54:54.000Z",
                  "productId": 2,
                  "quantity": 2
                }
              );
        });
    });
    describe("Adicionando Venda", function() {
        before(async function () {
            sinon.stub(connection, "execute").resolves(salesMock.newId);
        })
        after(async function() {
            connection.execute.restore();
        })
        it("Teste função insertSale", async function() {
            const result = await salesModel.insertSale(salesMock.cadastroEntrada);

            expect(result).to.be.deep.equal(3)
        })
    })
    describe("Deletando Venda", function() {
        before(async function () {
            sinon.stub(connection, "execute").resolves();
        })
        after(async function() {
            connection.execute.restore();
        })
        it("Teste função insertSale", async function() {
            const result = await salesModel.deleteSale(1);

            expect(result).to.be.deep.equal()
        })
    })
});