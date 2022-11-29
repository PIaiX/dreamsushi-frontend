import { BASE_URL } from '../config/api'

const getImageURL = (path = '', size = 'mini') => {
      if (path && path.length > 0) {
            if (size == 'mini') {
                  return `${BASE_URL}/${path[0].mini}`
            } else {
                  return `${BASE_URL}/${path[0].media}`
            }
      } else {
            return '/images/no-photo.png'
      }
}

export { getImageURL }
