import {memo, useCallback, useState} from 'react'
import {FiMinus, FiPlus} from 'react-icons/fi'
import {useDispatch, useSelector} from 'react-redux'
import {customPoint} from '../../helpers/customPrice'
import {isCart, useTotalCart, useTotalProduct} from '../../hooks/useCart'
import {cartDelete, cartUpdate} from '../../store/reducers/cartSlice'
import Button from '../UI/Button'

const ButtonCart = memo(
    ({product, full = false, options = false, cart = false, sale = false, btnText = 'Выбрать'}) => {
        const state = useSelector((state) => state)
        const dispatch = useDispatch()
        const cartInfo = isCart(product)
        const {total} = useTotalCart(false)
        const data = options && useTotalProduct(options)
        const [openCount, setOpenCount] = useState(false)

        const isValid = () => {
            if (sale && sale.minPrice > 0 && product.type == 'sale') {
                if (total < sale.minPrice) {
                    return false
                }
            }
            if (sale && !sale.other) {
                let isSale = state.cart.items.find((e) => e.type === 'sale')
                if (isSale) {
                    return false
                }
            }
            if (
                (product.type == 'gift' && state.auth.pointApp >= product.price && !cartInfo) ||
                product.type != 'gift'
            ) {
                return true
            }
            return false
        }

        const onPress = useCallback(
            (newCount) => {
                if (options) {
                    product.options = options
                    product.total = data.total
                }
                if (newCount === 0) {
                    setOpenCount(false)
                    dispatch(cartDelete({product, count: 0}))
                } else {
                    setOpenCount(true)
                    dispatch(cartUpdate({product, count: newCount}))
                }
            },
            [options, data.total]
        )

        if (
            (cartInfo?.count != undefined && cartInfo?.count > 0 && !product?.productParams?.length) ||
            cart ||
            (full && openCount)
        ) {
            return (
                <div className="input-box">
                    <Button
                        type="button"
                        className="edge me-2 me-sm-3"
                        onClick={() => onPress(cartInfo?.count - 1)}
                        disabled={cartInfo?.count <= 0}
                    >
                        <FiMinus />
                    </Button>
                    <Button type="button" className="center">
                        {cartInfo?.count > 0 ? cartInfo.count : 1}
                    </Button>
                    <Button
                        type="button"
                        className="edge ms-2 ms-sm-3"
                        onClick={() => onPress(cartInfo?.count + 1)}
                        disabled={cartInfo?.count >= 999}
                    >
                        <FiPlus />
                    </Button>
                </div>
            )
        }

        return (
            <Button className="btn-2" isValid={isValid()} onClick={() => onPress(1)}>
                {product.type == 'gift'
                    ? cartInfo
                        ? 'Добавлено'
                        : customPoint({
                              value: product.price,
                          })
                    : btnText}
            </Button>
        )
    }
)
export default ButtonCart
