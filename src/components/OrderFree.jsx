import React from 'react'
import {getSettings} from '../helpers/getSettings'

const OrderFree = () => {
    const deliveryText = getSettings('deliveryText')
    return deliveryText && <p className="mb-3">{deliveryText}</p>
}

export default OrderFree
