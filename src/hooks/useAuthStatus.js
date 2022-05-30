import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {

            const auth = getAuth()
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsLoggedIn(true)
                }
                setIsLoading(false)
            })
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted])


    return {
        isLoading,
        isLoggedIn
    }
}

export default useAuthStatus