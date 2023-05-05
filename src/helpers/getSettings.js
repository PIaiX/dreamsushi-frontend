import {useSelector} from 'react-redux'

const getSettings = (name) => {
    const settings = useSelector((state) => state?.settings?.options)
    let options = settings ? settings.find((e) => e.name === name)?.value : false
    return options
}

export {getSettings}
