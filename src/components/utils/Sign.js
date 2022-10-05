import React from 'react';

export default function Sign(props) {
    const currentYear = new Date().getFullYear();
    return (
        <div className={'light-gray '+ props.className}>
            © ООО «DreamSushi», 
            <br/>{currentYear}. Все права защищены
        </div>
    );
}