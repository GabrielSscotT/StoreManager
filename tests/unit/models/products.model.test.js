const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const productsModel = require("../../../src/models/products.model");

const productsMock = require("./mocks/products.model.mock");

describe("Testes model de produtos", function() {
    describe("Puxando a lista de produtos", function() {
        before(async function () {
            sinon.stub(connection, "execute").resolves([productsMock.products]);
        });
        after(async function () {
            connection.execute.restore();
        });
        it("Teste função findAll", async function (){
            const result = await productsModel.findAll();

            expect(result).to.be.deep.equal([
                { id: 1, name: "Martelo de Thor" },
                { id: 2, name: "Traje de encolhimento" },
                { id: 3, name: "Escudo do Capitão América" },
            ]);
        });
    });

    describe("Puxando um produto", function (){
        before(async function () {
            sinon.stub(connection, "execute").resolves([[productsMock.products[0]]]);
        });
        after(async function () {
            connection.execute.restore();
        });
        it("Teste função findById", async function () {
            const result = await productsModel.findById(1);

            expect(result).to.be.deep.equal({ id: 1, name: "Martelo de Thor" });
        });
    });
    describe("Adicionando produto", function() {
        before(async function () {
            sinon.stub(connection, "execute").resolves(productsMock.newId);
        });
        after(async function () {
            connection.execute.restore();
        });
        it("Teste função addNew", async function () {
            const result = await productsModel.addNew(productsMock.productName);
            console.log(result)

            expect(result).to.be.deep.equal(4)
        })
    })
});