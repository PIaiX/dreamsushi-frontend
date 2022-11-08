import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container'
// import {getSearch} from '../services/search'
import CategoriesContainer from '../components/containers/CategoriesContainer'
import Loader from '../components/UI/Loader'
import Info from '../components/UI/Info'
import {IoSearch} from 'react-icons/io5'
import {useSearchParams} from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import {getSearch} from '../services/search'

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchText = useDebounce(searchParams.get('text') ?? '')
    const [data, setData] = useState({
        isLoaded: false,
        error: null,
        items: [],
    })

    const getData = () => {
        getSearch(searchText)
            .then(
                (res) =>
                    res &&
                    setData((prev) => ({
                        ...prev,
                        isLoaded: true,
                        items: res.data,
                    }))
            )
            .catch((error) => error && setData((prev) => ({...prev, isLoaded: true, error})))
    }

    useEffect(() => {
        if (searchText) {
            getData()
        }
    }, [searchText])

    return (
        <main>
            <Container>
                <form className="form-search">
                    <input
                        type="search"
                        placeholder="Поиск..."
                        value={searchParams.get('text')}
                        defaultValue={searchParams.get('text')}
                        onChange={(e) => setSearchParams({text: e.target.value})}
                    />
                    <button type="sumbit" className="fs-15 ms-2 ms-sm-3 ms-md-4">
                        <IoSearch />
                    </button>
                </form>
            </Container>
            <div className="mt-5">
                {!data.isLoaded && searchText.length > 0 ? (
                    <Loader full={true} />
                ) : !data.items || data.items.length == 0 ? (
                    <Info className="d-flex flex-column align-items-center justify-content-center account-info">
                        {searchText.length > 0 ? 'Ничего не найдено' : 'Начните вводить текст'}
                    </Info>
                ) : (
                    <CategoriesContainer categories={data.items} />
                )}
            </div>
        </main>
    )
}

export default Search
