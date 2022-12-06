const { expect } = require("chai");
const sinon = require("sinon");

const salesController = require("../../../src/controllers/sales.controller");
const salesService = require("../../../src/services/sales.service");
const salesMock = require("./mocks/sales.controller.mock");

describe("Testes controller de vendas", function() {
    describe("Puxando a lista de vendas", function() {
        before(async function () {
            sinon.stub(salesService, "saleList").resolves(salesMock.vendas);
        });
        after(async function () {
            sinon.restore();
        });
        it("A requisição tem como resultado o código 200?", async function () {
            const req = {}
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.showAllSales(req, res);

            expect(res.status.calledWith(200)).to.be.true;
        })
        it("Teste função showAllSales", async function (){
            const req = {}
            const res = {}

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.showAllSales(req, res);;

            expect(res.json.calledWith(salesMock.vendas)).to.be.true;
        });
    });
    describe("Puxando uma venda", function() {
        afterEach(async function() {
            sinon.restore();
        })
        it("A requisição tem como resultado o código 200?", async function(){
            sinon
              .stub(salesService, "saleById")
              .resolves({ type: null, message: salesMock.venda1 });

            const req = { params: { saleId: 1 } }
            const res = {}
            
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.showSaleByID(req, res);

            expect(res.status.calledWith(200)).to.be.true;
        })
        it("Teste função showSalesById", async function(){
            sinon
              .stub(salesService, "saleById")
              .resolves({ type: null, message: salesMock.venda1 });

            const req = { params: { saleId: 1 } }
            const res = {}
            
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.showSaleByID(req, res);

            expect(res.json.calledWith(salesMock.venda1)).to.be.true;
        })
        it("Teste função showSalesById", async function(){
            sinon
              .stub(salesService, "saleById")
              .resolves({ type: "SALE_NOT_FOUND", message: "Sale not found" });

            const req = { params: { saleId: 9 } }
            const res = {}
            
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.showSaleByID(req, res);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ message: "Sale not found" })).to.be.true;
        })
    })
});