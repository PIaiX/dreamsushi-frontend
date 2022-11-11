import React, {useCallback, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductItem from '../components/ProductItem'
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
import {useDispatch, useSelector} from 'react-redux'
import usePagination from '../hooks/pagination'
import {getFavorites} from '../services/RTK/favorite'
import ReactPaginate from 'react-paginate'
import Info from '../components/UI/Info'

const Favorites = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const favorite = useSelector((state) => state?.favorite)
    const pagination = useSelector((state) => state?.favorite?.pagination)
    const {pageLimit, setPageLimit, currentPage, setCurrentPage, startingPage, setStartingPage} = usePagination(2)

    useEffect(() => {
        if (isAuth) {
            dispatch(getFavorites({page: currentPage, limit: pageLimit}))
        }
    }, [isAuth, currentPage, pageLimit])

    useEffect(() => {
        console.log('curr', currentPage)
    }, [currentPage])

    return (
        <main className="favorites">
            <Container>
                <section className="mb-6">
                    <div className="favorites__inner">
                        <h1>Любимые блюда</h1>
                        <Row xs={2} md={3} lg={4} className="justify-content-start gx-3 gx-sm-4 gy-5">
                            {!favorite?.error ? (
                                favorite?.items?.length > 0 ? (
                                    favorite.items.map((item) => (
                                        <Col key={item?.id}>
                                            <ProductItem product={item} />
                                        </Col>
                                    ))
                                ) : (
                                    <Info>Вы не добавили ни одного товара в избранные</Info>
                                )
                            ) : null}
                        </Row>
                    </div>
                    {pagination && pagination?.pageCount && (
                        <ReactPaginate
                            breakLabel="..."
                            pageRangeDisplayed={1}
                            className="pagination favorites__pagination"
                            previousLabel=""
                            nextLabel=""
                            onPageChange={(event) => setCurrentPage(event.selected + 1)}
                            pageCount={pagination?.pageCount}
                            renderOnZeroPageCount={null}
                        />
                    )}
                </section>
            </Container>
        </main>
    )
}

export default Favorites
