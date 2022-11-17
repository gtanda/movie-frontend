import tmdbService from '../services/tmdb';
import { useEffect, useState } from 'react'
import useDebounce from "../hooks/useDebounce";
export const Recommendations = () => {
    const [input, setInput] = useState('')

    const debouncedSearch = useDebounce(input, 500)

    useEffect(() => {
        const getRecommendations = async () => {
            const recommendations = await tmdbService.getSearch(debouncedSearch)
            console.log(recommendations)
        }
        getRecommendations().then(res => console.log(res))
    }, [debouncedSearch])

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }


    return (
        <div>
            <h1>Recommendations</h1>
            <input onChange={handleInputChange}/>
        </div>
    )
}

export default Recommendations;
