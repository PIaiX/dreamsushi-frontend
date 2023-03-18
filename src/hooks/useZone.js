import * as Geolib from 'geolib'
import GeoFile from '../config/geo'

const useZone = (locations) => {
    const lat = locations?.latitude ? locations.latitude : locations?.lat ? locations.lat : false
    const lon = locations?.longitude ? locations.longitude : locations?.lon ? locations.lon : false

    if (!lat || !lon) {
        return 'Нет данных координат'
    }

    var data = GeoFile.features
    var coordinates = []
    var zone = false
    var dataZone = []
    var polyId = 0

    if (data) {
        data.map((item) => {
            Array(item).map((poly) => {
                coordinates[polyId] = poly.geometry.coordinates[0]
                dataZone[polyId] = poly.properties
                polyId++
            })
        })
    }
    if (coordinates && dataZone.length > 0) {
        coordinates.map((item, i) => {
            var dist = Geolib.isPointInPolygon({latitude: lat, longitude: lon}, item)
            if (dist) {
                zone = dataZone[i]
            }
        })
    }
    return zone
}
export default useZone
