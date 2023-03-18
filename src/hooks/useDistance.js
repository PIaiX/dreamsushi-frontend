import * as Geolib from 'geolib'

const getTimeFromMin = (min) => {
    let hours = Math.trunc(min / 60)
    let minutes = min % 60
    if (hours > 0) return hours + '.' + minutes.toString()[0] + 'ч'
    return minutes + 'мин'
}
const useDistance = (locations) => {
    const lat = locations?.latitude ? locations.latitude : locations?.lat ? locations.lat : false
    const lon = locations?.longitude ? locations.longitude : locations?.lon ? locations.lon : false

    if (!lat || !lon) {
        return 0
    }

    let distance = Geolib.getPreciseDistance(
        {latitude: lat, longitude: lon},
        {latitude: 55.77644620573668, longitude: 49.234231336147296}
    )

    let traffic = 20 // Пробка и возможные задержки
    let cooking = 20 // Готовка еды
    let speed = 10 // 10 км/ч
    let distanceValue = distance / 1000 // Данные в КМ
    let time = (distanceValue / speed) * 60 + cooking
    let timeTraffic = (distanceValue / speed) * 60 + cooking + traffic
    return {
        time: `${getTimeFromMin(time.toFixed(0)) ?? 20} - ${getTimeFromMin(timeTraffic.toFixed(0) ?? 40)}`,
        distance,
    }
}

export default useDistance
