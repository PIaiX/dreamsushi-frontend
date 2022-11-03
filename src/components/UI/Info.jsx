import React from 'react'

const Info = ({children, className, fontSize = 20, color = '#FFF', ...props}) => {
    return (
        <div
            className={`w-100 text-center ${className ? className : ''}`}
            style={{fontSize: `${fontSize}px`, color}}
            {...props}
        >
            {children}
        </div>
    )
}

export default Info
