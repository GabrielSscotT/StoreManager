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
        })
    })
})