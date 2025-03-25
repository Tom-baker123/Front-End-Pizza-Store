import React from 'react'
import { useParams } from 'react-router-dom'

const My_Item = () => {
    const { id } = useParams();

    return (
        <div>{id}</div>
    )
}

export default My_Item