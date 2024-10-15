import { useEffect, useState } from 'react'
import { token } from '../config'

const useFetchData = url => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const result = await res.json()
                // console.log(result.data);
                if (!res.ok) {
                    console.error(result);
                    throw new Error(result.message + "🤢")
                }
                setData(result.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [url])

    return {
        data, loading, error,
    }
}

export default useFetchData