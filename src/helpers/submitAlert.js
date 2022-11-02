import store from '../store/store'
import { setAlert } from '../store/reducers/alertSlice'
const submitAlert = (variant, message) => {
    store.dispatch(setAlert({ variant, message }))
}
export default submitAlert
