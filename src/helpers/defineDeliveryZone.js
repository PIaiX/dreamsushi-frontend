import * as Geolib from 'geolib'
import Geo from '../config/geo.json'

const defineDeliveryZone = (props) => {

    if (!props) {
        return 'Нет props'
    }
    const data = Geo.features
    if (!data || data.length === 0) {
        return 'Нет данных features'
    }

    var zone = {
        name: 'Неизвестная зона',
        affiliate: '',
        description: 'Доставка не предусмотрена',
        status: false,
        price: 0,
    }
    var coordinates = []
    var dataZone = []
    var polyId = 0

    data.map((item) => {
        Array(item).map((poly) => {
            coordinates[polyId] = poly.geometry.coordinates
            dataZone[polyId] = poly.properties
            polyId++
        })
    })

    if (!coordinates || coordinates.length === 0) {
        return 'Нет координат зон'
    }

    coordinates.map((item, i) => {
        let dist = Geolib.isPointInPolygon({ latitude: props.lat, longitude: props.lon }, item)
        if (dist) {
            zone = dataZone[i] ? dataZone[i] : false
        }
    })

    return zone
}

export default defineDeliveryZone
