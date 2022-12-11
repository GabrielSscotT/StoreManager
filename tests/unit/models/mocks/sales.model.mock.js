const vendas = [
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
];

const venda1 = [
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
  ];

const newId = [{ insertId: 3 }]

const cadastroEntrada = [
  {productId:1,quantity:1},
  {productId:2,quantity:5},
]

const cadastroSucesso = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
}
module.exports = {
    vendas,
    venda1,
    newId,
    cadastroEntrada,
    cadastroSucesso,
}