import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {GrEdit} from 'react-icons/gr'
import CustomDataTable from '../../../components/CustomDataTable'
import Loader from '../../../components/UI/Loader'
import {deleteMark, getMarks} from '../../../services/admin'
import Info from '../../../components/UI/Info'
import CustomModal from '../../../components/utils/CustomModal'
import {IoTrashOutline} from 'react-icons/io5'
import Button from '../../../components/UI/Button'

const Marks = () => {
    const [marks, setMarks] = useState({
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
    const markColumns = [
        {
            name: 'Название',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Значение',
            selector: 'value',
            sortable: true,
        },
        {
            selector: 'action',
            right: true,
            width: '100px',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <Link to={`/account/mark/${row.id}`} className="me-4">
                        <GrEdit size={15} color="#fff" />
                    </Link>
                    <a onClick={() => setModalDelete({isShow: !modalDelete.isShow, id: row.id})}>
                        <IoTrashOutline size={20} color="#ff5252" />
                    </a>
                </div>
            ),
        },
    ]
    const getData = (page = 1) => {
        getMarks(page, limit)
            .then(
                (res) =>
                    res &&
                    setMarks((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.marks?.rows,
                        pagination: res.pagination,
                    }))
            )
            .finally(() => setMarks((prev) => ({...prev, isLoaded: true})))
    }

    const handlePageChange = (page) => {
        getData(page)
    }

    const handlePerRowsChange = async (newLimit, page) => {
        setLimit(newLimit)
        getMarks(page, newLimit)
            .then(
                (res) =>
                    res &&
                    setMarks((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.marks?.rows,
                        pagination: res.pagination,
                    }))
            )
            .finally(() => setMarks((prev) => ({...prev, isLoaded: true})))
    }

    useEffect(() => {
        getData()
    }, [])

    const clickDelete = (id) => {
        deleteMark(id).then(() => getData())
        setModalDelete({isShow: false, id: false})
    }

    if (!marks.isLoaded) {
        return <Loader full />
    }

    if (!marks.items || marks.items.length === 0) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                <h3 className="mb-4">Меток нет</h3>
                <p>
                    <Link to="/admin/mark/create" className="btn-2 fs-08">
                        Добавить
                    </Link>
                </p>
            </Info>
        )
    }

    return (
        <section className="marks">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h1 className="m-0">Метки клиентов</h1>
                <Link to="/admin/mark/create" className="btn-2">
                    Добавить
                </Link>
            </div>
            <CustomDataTable
                handlePerRowsChange={handlePerRowsChange}
                handlePageChange={handlePageChange}
                columns={markColumns}
                data={marks.items}
                pagination={marks.pagination}
            />
            <CustomModal
                title={`Удаление ${modalDelete.id ? '#' + modalDelete.id : ''}`}
                isShow={modalDelete.isShow}
                setIsShow={(e) => setModalDelete({isShow: e, id: false})}
                footer={
                    <>
                        <Button
                            className="btn-1 me-3"
                            onClick={(e) => setModalDelete({isShow: !modalDelete.isShow, id: false})}
                        >
                            Отмена
                        </Button>
                        <Button className="btn-2" onClick={() => modalDelete.id && clickDelete(modalDelete.id)}>
                            Удалить
                        </Button>
                    </>
                }
            >
                Вы точно хотите удалить метку?
            </CustomModal>
        </section>
    )
}

export default Marks
