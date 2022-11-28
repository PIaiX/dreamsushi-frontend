import { BASE_URL } from '../config/api'

const getImageURL = (path = '', size = 'mini') => (path ? size == 'mini' ? `${BASE_URL}/mini/${path}` : `${BASE_URL}/${path}` : '/images/no-photo.png')

export { getImageURL }
