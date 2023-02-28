import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import React from 'react'

function useAuthStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingStatus, setCheckignStatus] = useState(true);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        if(user) {  
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        setCheckignStatus(false);
    }, [user])

    return {isLoggedIn, checkingStatus};
}

export default useAuthStatus