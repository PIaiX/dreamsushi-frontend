import React from 'react'

const Sign = (props) => {
    const currentYear = new Date().getFullYear()

    return (
        <div className={'light-gray ' + props.className}>
            © ООО «Dream Sushi»,
            <br />
            {currentYear}. Все права защищены
            <br />
            <br />
            ИНН: 165720631401 <br />
            ОГРН: 317169000183155
        </div>
    )
}

export default Sign
