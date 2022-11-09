import React, {useCallback, useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductItem from '../components/ProductItem'
import {getFavorites} from '../services/favorites'
import {useSelector} from 'react-redux'

const Favorites = () => {
    // pagination
    const initialLimit = 10
    const [page, setPage] = useState(0)
    const [isFetching, setIsFetching] = useState(false)

    const isAuth = useSelector((state) => state?.auth?.isAuth)
    const [favorites, setFavorites] = useState({
        isLoaded: false,
        error: null,
        items: [],
        pagination: {},
    })

    const fetchFavorites = useCallback(
        (delay) => {
            setTimeout(() => {
                getFavorites({page, initialLimit})
                    .then(
                        (res) =>
                            res &&
                            setFavorites((prev) => ({
                                ...prev,
                                isLoaded: true,
                                items: res?.products,
                                pagination: res?.pagination,
                            }))
                    )
                    .catch((error) => error && setFavorites((prev) => ({...prev, isLoaded: true, error})))
            }, delay)
        },
        [page]
    )

    const onScroll = (event) => {
        // console.log('sY', window.scrollY)
        // console.log('iH', window.innerHeight)

        console.log(event)

        // console.log('sT', event.target.scrollTop)
        // console.log('oH', event.target.offsetHeight)
        // console.log('sH', event.target.scrollHeight)

        // const isScrollOnBottom = event.target.scrollTop + event.target.offsetHeight >= event.target.scrollHeight
        //
        // if (!isFetching && isScrollOnBottom && favorites?.pagination?.allCount > favorites?.items?.length) {
        //     setIsFetching(true)
        // }
    }

    useEffect(() => {
        document.body.addEventListener('scroll', onScroll)
        // return document.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        // fetch favorites by lazy loading
        if (isAuth && isFetching) {
            fetchFavorites(1000)
        }
    }, [isAuth, isFetching])

    useEffect(() => {
        console.log('fav', favorites)
    }, [favorites])

    return (
        <main onScroll={onScroll}>
            <Container>
                <section className="mb-6">
                    <h1>Любимые блюда</h1>
                    <Row xs={2} md={3} lg={4} className="justify-content-center gx-3 gx-sm-4 gy-5">
                        <Col>
                            <ProductItem
                                title={'Маргарита'}
                                imgLink={'images/products/prod10.jpg'}
                                price={'1100 '}
                                oldPrice={'1300'}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Пицца Мясная'}
                                imgLink={'images/products/prod8.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Пеперони Острая'}
                                imgLink={'images/products/prod9.jpg'}
                                price={'900'}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                        <Col>
                            <ProductItem
                                title={'Посейдон'}
                                imgLink={'images/products/prod7.jpg'}
                                price={'1100 '}
                                oldPrice={''}
                                weight={'1000'}
                                fav={true}
                            />
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    )
}

export default Favorites
