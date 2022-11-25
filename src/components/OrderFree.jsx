import React, {useState, useEffect} from 'react'
import {getSite} from '../services/admin'

const OrderFree = (cart) => {
    const [site, setSite] = useState({
        deliveryText: '',
    })

    useEffect(() => {
        getSite().then(
            (res) => res?.site && setSite({deliveryText: res.site.find((e) => e.name === 'deliveryText')?.value})
        )
    }, [])

    return <p className="mb-3">{site.deliveryText}</p>
}

export default OrderFree
