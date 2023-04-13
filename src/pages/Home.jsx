import React from 'react'
import Container from 'react-bootstrap/Container'
import {MetaTags} from 'react-meta-tags'
import CategoriesContainer from '../components/containers/CategoriesContainer'
import BannerSection from '../components/BannerSection'
import Loader from '../components/UI/Loader'
import {useGetCategoriesQuery, useGetSalesQuery} from '../services/RTK/home'
const reviews = [
    {
        id: 1,
        name: 'Антон И.',
        initials: 'АИ',
        text: 'Прекрасное место по соотношению цена-качество. Были в заведении на Гагарина, все прекрасно, особенно хочется отметить работу официанта. Очень приятный, обходительный молодой человек. Настоящий профессионал',
    },
    {
        id: 2,
        name: 'Юлия А.',
        initials: 'ЮА',
        text: 'Очень вкусные роллы по приятным ценам. Пробовали много где, но всегда возвращаемся сюда. Большие и вкусные! 👍',
    },
    {
        id: 3,
        name: 'Артем Т.',
        initials: 'АТ',
        text: 'Цена качество! Самый оптимальный вариант среди множества суши баров. Всё очень вкусно. Единственное из минусов, то что по праздникам ожидание доставки до 2-х часов.',
    },
    {
        id: 4,
        name: 'Динара Б.',
        initials: 'ДБ',
        text: 'Очень вкусные и нежные роллы! Цена-качество👍 Заказывали неоднократно, будем заказывать ещё! Роллы перепробовали много где, поэтому эти роллы у нас - в тройке лучших!',
    },
]
const Home = () => {
    const sales = useGetSalesQuery()
    const categories = useGetCategoriesQuery()

    return (
        <main>
            {(sales.isLoading || categories.isLoading) && <Loader full />}
            <MetaTags>
                <title>{process.env.REACT_APP_SITE_NAME} — доставка суши, ролл и пиццы в Казани</title>
                <meta
                    property="title"
                    content={process.env.REACT_APP_SITE_NAME + ' — доставка суши, ролл и пиццы в Казани'}
                />
                <meta
                    property="og:title"
                    content={process.env.REACT_APP_SITE_NAME + ' — доставка суши, ролл и пиццы в Казани'}
                />
                <meta name="description" content={process.env.REACT_APP_SITE_DESCRIPTION} />
                <meta name="og:description" content={process.env.REACT_APP_SITE_DESCRIPTION} />
            </MetaTags>
            {!sales?.data?.error && sales?.data?.sales?.length > 0 && (
                <Container>
                    <BannerSection sales={sales.data.sales} />
                </Container>
            )}
            {!categories.error && categories?.data?.categories?.length > 0 && (
                <CategoriesContainer categories={categories.data.categories} />
            )}
        </main>
    )
}

export default Home
