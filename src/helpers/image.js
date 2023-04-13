import { BASE_URL } from '../config/api'

const getImageURL = (path = '', size = 'mini', type = 'products') => {
      console.log(BASE_URL + '/' + type + path[0].media.full)
      if (path && path.length > 0) {
            if (size == 'mini') {
                  return BASE_URL + '/' + type + path[0].media.mini
            } else {
                  return BASE_URL + '/' + type + path[0].media.full
            }
      } else {
            return '/images/no-photo.png'
      }
}

export { getImageURL }
