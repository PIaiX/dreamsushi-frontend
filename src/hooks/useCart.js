import { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getSettings } from '../helpers/getSettings'
import useZone from './useZone'

const useTotalProduct = (options) => {
    const [data, setData] = useState({
        total: 0,
        price: 0,
        discount: 0,
        cashback: 0,
    })

    useLayoutEffect(() => {
        let price = 0
        let discount = 0

        if (options?.params) {
            price += options.params.price
            if (options.params.priceSale > 0) {
                discount += options.params.priceSale - options.params.price
                price += discount
            }
        }

        if (options?.additions && Array.isArray(options.additions)) {
            options.additions.map((e) => {
                let count = e.count ? e.count : 1
                price += e.price * count
                if (e.priceSale > 0) {
                    discount += e.priceSale * count - e.price * count
                    price += discount
                }
            })
        }

        let totalCalcul = discount > 0 ? price - discount : price
        if (totalCalcul) {
            setData({
                ...data,
                total: totalCalcul,
                price,
                discount,
            })
        }
    }, [options])

    return data
}

const isCart = (product) => {
    if (!product) {
        return false
    }
    const items = useSelector(({ cart: { items } }) => items)

    let item = items?.length
        ? items.find((e) => {
            if (e.id === product?.id) {
                if (e?.options && product?.options) {
                    return JSON.stringify(e.options) === JSON.stringify(product.options)
                }
                return true
            }
        })
        : false
    return item
}

const useTotalCart = () => {
    const state = useSelector(({ checkout: { delivery }, auth, cart: { promo, items }, address }) => ({
        delivery,
        address,
        items,
        auth,
        promo,
    }))

    const selectedAddress = state?.address?.items ? state.address.items.find((e) => e.main) : false
    const cashbackValue = getSettings('cashbackOrder')
    const zone = selectedAddress && useZone(selectedAddress)

    const [data, setData] = useState({
        count: 0,
        sticks: 0,
        total: 0,
        price: 0,
        discount: 0,
        delivery: 0,
        free: zone?.free ? zone.free : 0,
        minSum: zone?.minSum ? zone.minSum : 0,
        minSumText: zone?.description ? zone.description : false,
    })

    useLayoutEffect(() => {
        if (state?.items?.length) {
            let price = 0
            let discount = 0
            let delivery = 0
            let sticks = 0

            state.items.map((product) => {
                sticks += product.sticks ? product.sticks * product.count : 0

                if (product?.options?.params) {
                    price += product.options.params.price * product.count
                    if (product.options.params.priceSale > 0) {
                        discount +=
                            product.options.params.priceSale * product.count -
                            product.options.params.price * product.count
                        price += discount
                    }
                } else {
                    price += product.price * product.count
                    if (product.priceSale > 0) {
                        discount += product.priceSale * product.count - product.price * product.count
                        price += discount
                    }
                }

                if (product?.options?.additions?.length) {
                    product.options.additions.map((e) => {
                        let count = e.count ? e.count : 1
                        price += e.price * count
                        if (e.priceSale > 0) {
                            discount += e.priceSale * count - e.price * count
                            price += discount
                        }
                    })
                }
            })
            if (price) {
                let totalCalcul = discount > 0 ? price - discount : price

                if (state.promo) {
                    if (state.promo.procent > 0) {
                        totalCalcul = totalCalcul - (totalCalcul / 100) * state.promo.procent
                    } else if (state.promo.discount > 0) {
                        totalCalcul = totalCalcul - state.promo.discount
                    }
                }

                let cashback = cashbackValue > 0 ? Math.round((totalCalcul / 100) * cashbackValue) : 0

                if (zone?.free > price) {
                    delivery += zone.price
                    if (state.delivery == 'delivery') {
                        totalCalcul += zone.price
                    }
                }

                setData({
                    ...data,
                    total: totalCalcul,
                    count: state.items.length,
                    sticks,
                    price,
                    discount,
                    delivery,
                    cashback,
                    free: zone.free,
                    minSum: zone.minSum
                })
            }
        }
    }, [state.items, state.address, state.auth, state.promo, state.delivery])

    return data
}

export { isCart, useTotalProduct, useTotalCart }
