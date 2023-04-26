import { apiErrors, apiRejectMessages } from '../config/api'
import { createLogs } from '../services/logs';

const defineErrorByType = (error, userId) => {
    const type = error?.response?.data?.message?.type || error?.message?.type || true
    switch (type) {
        case apiErrors[type]:
            return apiRejectMessages[type]
        default:
            let text = error?.response?.data?.message?.text
                ? error.response.data.message.text
                : error?.message?.text
                    ? error.message.text : apiRejectMessages.DEFAULT;
            createLogs({ type: 'error', log: text, userId: userId ?? null })
            return text
    }
}

export default defineErrorByType
