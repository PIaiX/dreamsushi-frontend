import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {GrEdit} from 'react-icons/gr'
import CustomDataTable from '../../../components/CustomDataTable'
import Loader from '../../../components/UI/Loader'
import {deleteSale, getSales} from '../../../services/admin'
import Info from '../../../components/UI/Info'
import CustomModal from '../../../components/utils/CustomModal'
import {IoTrashOutline} from 'react-icons/io5'
import Button from '../../../components/UI/Button'
import {Image} from 'react-bootstrap'
import {getImageURL} from '../../../helpers/image'

const Sales = () => {
    const [sales, setSales] = useState({
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
    const saleColumns = [
        {
            name: '',
            selector: 'images',
            width: '80px',
            center: true,
            cell: (row) => <Image rounded className="product-micro-img" src={getImageURL(row.images)} />,
        },
        {
            name: 'Название',
            selector: 'title',
        },
        {
            name: 'Описание',
            selector: 'desc',
        },
        {
            selector: 'action',
            center: true,
            width: '100px',
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <Link to={`/admin/sale/${row.id}`} className="me-4">
                        <GrEdit size={15} color="#fff" />
                    </Link>
                    <a onClick={() => setModalDelete({isShow: !modalDelete.isShow, id: row.id})}>
                        <IoTrashOutline size={20} color="#ff5252" />
                    </a>
                </div>
            ),
        },
    ]
    const getData = (page) => {
        getSales(page, limit)
            .then(
                (res) =>
                    res &&
                    setSales((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.sales?.rows,
                        pagination: res?.pagination,
                    }))
            )
            .finally(() => setSales((prev) => ({...prev, isLoaded: true})))
    }

    const handlePageChange = (page) => {
        getData(page)
    }

    const handlePerRowsChange = async (newLimit, page) => {
        setLimit(newLimit)
        getSales(page, newLimit)
            .then(
                (res) =>
                    res &&
                    setSales((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res?.sales?.rows,
                        pagination: res?.pagination,
                    }))
            )
            .finally(() => setSales((prev) => ({...prev, isLoaded: true})))
    }

    useEffect(() => {
        getData()
    }, [])

    const clickDelete = (id) => {
        deleteSale(id).then(() => getData())
        setModalDelete({isShow: false, id: false})
    }

    if (!sales.isLoaded) {
        return <Loader full />
    }

    if (!sales.items || sales.items.length === 0) {
        return (
            <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                <h3 className="mb-4">Акций нет</h3>
                <p>
                    <Link to="/admin/sale/create" className="btn-2 fs-08">
                        Добавить
                    </Link>
                </p>
            </Info>
        )
    }

    return (
        <section className="sales">
            <div className="d-flex flex-row justify-content-between align-items-center mb-4">
                <h1 className="m-0">Акции</h1>
                <Link to="/admin/sale/create" className="btn-2">
                    Добавить
                </Link>
            </div>
            <CustomDataTable
                handlePerRowsChange={handlePerRowsChange}
                handlePageChange={handlePageChange}
                columns={saleColumns}
                data={sales.items}
                pagination={sales.pagination}
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
                Вы точно хотите удалить акцию?
            </CustomModal>
        </section>
    )
}

export default Sales
