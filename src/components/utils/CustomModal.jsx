import React from 'react'
import {Modal} from 'react-bootstrap'
import {IoClose} from 'react-icons/io5'

const CustomModal = (props) => {
    const closeModal = () => props.setIsShow(false)

    return (
        <Modal
            className={props.className ?? ''}
            show={props.isShow}
            onHide={closeModal}
            centered
            size={props.size ?? null}
        >
            <Modal.Header className={props?.classNameHeader ?? ''}>
                {props?.title ? <h5>{props?.title}</h5> : null}
                <button className="close" onClick={closeModal}>
                    <IoClose />
                </button>
            </Modal.Header>
            <Modal.Body className={props?.classNameBody || ''}>{props.children}</Modal.Body>
            {props.footer && <Modal.Footer className={props?.classNameFooter || ''}>{props.footer}</Modal.Footer>}
        </Modal>
    )
}

export default CustomModal
