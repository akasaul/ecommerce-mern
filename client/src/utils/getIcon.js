import React from 'react'
import {  MdCategory, MdChair } from 'react-icons/md'
import { FaHamburger, FaTools, FaTv } from 'react-icons/fa'
import { GiTrousers } from 'react-icons/gi'


function getIcon(category) {
    switch (category?.trim()?.toLowerCase()) {
        case 'food': 
            return <FaHamburger />
        case 'cloth': 
            return <GiTrousers />
        case 'electronics': 
            return <FaTv />
        case 'instrument': 
            return <FaTools />
        case 'furniture': 
            return <MdChair />
        default: 
            return <MdCategory />
    }    
}

export default getIcon