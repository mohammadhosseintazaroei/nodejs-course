const profile = {
    first_name: "mohammad hossein",
    last_name: 'tazaroie'
}
const products = [
    {
        id: 1,
        title: 'product 1',
        description: 'docs for product 1',
        price: '1000',
    },
    {
        id: 2,
        title: 'product 2',
        description: 'docs for product 2',
        price: '1100',
    }, {
        id: 3,
        title: 'product 3',
        description: 'docs for product 3',
        price: '900',
    }, {
        id: 4,
        title: 'product 4',
        description: 'docs for product 4',
        price: '1000',
    }
]
const commetns = [
    {
        content: "this is a good product"
    },
    {
        content: "this is a good product"
    },
    {
        content: "this is a bad product"
    },
    {
        content: "this is a fucking product"
    },
    {
        content: "this is a great product"
    }
]
const basket = [
    {
        productId: 1,
        count: 3
    },
    {
        productId: 3,
        count: 1
    }
]

module.exports = {
    profile, products, commetns, basket
}