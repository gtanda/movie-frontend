import tmdbService from '../services/tmdb';
import { useEffect, useState, useRef } from 'react'
import AutoComplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useDebounce from "../hooks/useDebounce";

export const Recommendations = () => {
    const [input, setInput] = useState('')
    const [results, setResults] = useState([])
    const[recommendations, setRecommendations] = useState([])
    const textFieldRef = useRef(null)
    const debouncedSearch = useDebounce(input, 500)

    const filmTitles = results.map(film => film.title + ' (' + film.release_date + ')'
        + ' - ' + film.id)

    useEffect(() => {
        const getMovieSearch = async () => {
            const recommendations = await tmdbService.getMoviesList(debouncedSearch)
            setResults(recommendations)
        }
        if (input)
            getMovieSearch().then(r => console.log('results', r))
    }, [input, debouncedSearch])


    const handleRefChange = (e) => {
        textFieldRef.current = e.target.textContent
        try {
            fetchRecommendations(textFieldRef.current).then(r => console.log('recommendations', r))
        } catch (e) {
            console.log(e)
        }
    }

    const fetchRecommendations = async (query) => {
        const recommendations = await tmdbService.getRecommendations(query)
        setRecommendations(recommendations)
    }

    return (
        <div>
            <h1>Recommendations</h1>
            {/*Replace the style on here later*/}
            <AutoComplete style={{backgroundColor: 'beige', borderRadius: '5px', padding: '5px'}}
                          onChange={(e) => handleRefChange(e)}
                          options={filmTitles}
                          renderInput={(params) =>
                              <TextField {...params} label="Movie Search"
                                         onChange={(e) => setInput(e.target.value)}
                                         inputRef={textFieldRef}
                              /> }
                          />
        </div>
    )
}

export default Recommendations;
