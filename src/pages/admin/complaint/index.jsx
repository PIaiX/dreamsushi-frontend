import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {GrEdit} from 'react-icons/gr'
import CustomDataTable from '../../../components/CustomDataTable'
import Loader from '../../../components/UI/Loader'
import {deleteComplain, getComplaints} from '../../../services/admin'
import Info from '../../../components/UI/Info'
import CustomModal from '../../../components/utils/CustomModal'
import {IoTrashOutline} from 'react-icons/io5'
import Button from '../../../components/UI/Button'

const AdminComplaints = () => {
    const [complaints, setComplaints] = useState({
        isLoaded: false,
        error: null,
        items: [],
        pagination: false,
    })
    const [modalDelete, setModalDelete] = useState({
        isShow: false,
        id: false,
    })
    const [limit, setLimit] = useState(10)
    const complainColumns = [
        {
            name: 'Сообщение',
            selector: 'desc',
        },
        {
            name: 'Тип',
            selector: 'type',
            sortable: true,
        },
        {
            selector: 'action',
            right: true,
            width: '80px',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <a onClick={() => setModalDelete({isShow: !modalDelete.isShow, id: row.id})}>
                        <IoTrashOutline size={20} color="#ff5252" />
                    </a>
                </div>
            ),
        },
    ]
    const getData = (page = 1) => {
        getComplaints(page, limit)
            .then(
                (res) =>
                    res &&
                    setComplaints((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.complaints?.rows,
                        pagination: res.pagination,
                    }))
            )
            .catch((error) => error && setComplaints((prev) => ({...prev, isLoaded: true, error})))
    }

    const handlePageChange = (page) => {
        getData(page)
    }

    const handlePerRowsChange = async (newLimit, page) => {
        setLimit(newLimit)
        getComplaints(page, newLimit)
            .then(
                (res) =>
                    res &&
                    setComplaints((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.complaints?.rows,
                        pagination: res.pagination,
                    }))
            )
            .catch((error) => error && setComplaints((prev) => ({...prev, isLoaded: true, error})))
    }

    useEffect(() => {
        getData()
    }, [])

    const clickDelete = (id) => {
        deleteComplain(id).then(() => getData())
        setModalDelete({isShow: false, id: false})
    }

    if (!complaints.isLoaded) {
        return <Loader full />
    }

    if (!complaints.items || complaints.items.length === 0) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                <h3 className="mb-4">Жалоб и предложений нет</h3>
            </Info>
        )
    }

    return (
        <section className="complaints">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h1 className="m-0">Жалобы и предложения</h1>
            </div>
            <CustomDataTable
                handlePerRowsChange={handlePerRowsChange}
                handlePageChange={handlePageChange}
                columns={complainColumns}
                data={complaints.items}
                pagination={complaints.pagination}
            />
            <CustomModal
                title={`Удаление ${modalDelete.id ? '#' + modalDelete.id : ''}`}
                isShow={modalDelete.isShow}
                setIsShow={(e) => setModalDelete({isShow: e, id: false})}
                footer={
                    <>
                        <Button className="btn-1 me-3" onClick={(e) => setModalDelete({isShow: e, id: false})}>
                            Отмена
                        </Button>
                        <Button className="btn-2" onClick={() => modalDelete.id && clickDelete(modalDelete.id)}>
                            Удалить
                        </Button>
                    </>
                }
            >
                Вы точно хотите удалить?
            </CustomModal>
        </section>
    )
}

export default AdminComplaints
