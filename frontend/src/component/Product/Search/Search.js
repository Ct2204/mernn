
import {useNavigate} from 'react-router-dom'
import React, { Fragment, useState } from 'react'
import './Search.css'
import MetaData from '../../layout/MetaData.js'

const Search = () => {
   
    let nevigate = useNavigate()

    const [keyword, setKeyword] = useState('')
    
    const searchSubmitHandler = (e)  => {
        e.preventDefault();
        if (keyword.trim()) {
            nevigate(`/products/${keyword}`)
        }
        else {
            nevigate('/products')
        }
    }
    

    return <Fragment>

        <MetaData title='Search Working'/>

        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input
                type="text"
                placeholder='Search a Product ... '
                onChange={e => setKeyword(e.target.value)}
            />
            <input type="submit" value='search' />
      </form>
  </Fragment>
}

export default Search;