import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import React from 'react'

function useAuthStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if(user) {
            setIsLoggedIn(true);
        }
    }, [])


    return isLoggedIn;
}

export default useAuthStatus