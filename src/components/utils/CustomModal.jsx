import React from 'react'
import {Modal} from 'react-bootstrap'
import {IoClose} from 'react-icons/io5'

const CustomModal = ({
    className,
    setIsShow,
    isShow = false,
    size,
    classNameHeader,
    title,
    children,
    footer,
    classNameFooter,
    classNameBody,
}) => {
    return (
        <Modal className={className} show={isShow} onHide={() => setIsShow(false)} centered size={size}>
            <Modal.Header className={classNameHeader}>
                {title ? <h5>{title}</h5> : null}
                <button className="close" onClick={() => setIsShow(false)}>
                    <IoClose />
                </button>
            </Modal.Header>
            <Modal.Body className={classNameBody}>{children}</Modal.Body>
            {footer && <Modal.Footer className={classNameFooter}>{footer}</Modal.Footer>}
        </Modal>
    )
}

export default CustomModal
