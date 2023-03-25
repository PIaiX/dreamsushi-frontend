import {apiErrors, apiRejectMessages} from '../config/api'

const defineErrorByType = (error) => {
    const type = error?.response?.data?.message?.type || true
    switch (type) {
        case apiErrors[type]:
            return apiRejectMessages[type]
        default:
            return error?.response?.data?.message?.text
                ? error.response.data.message.text
                : apiRejectMessages.DEFAULT
    }
}

export default defineErrorByType
