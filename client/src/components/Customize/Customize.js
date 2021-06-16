import { useState } from 'react'

import ErrorMsg from "../ErrorMsg/ErrorMsg";
import ShortLink from "../ShortLink/ShortLink";

import './Customize.css'

const Customize = ({setCustomize, customize, setCustomUrl}) => {

    const onChange = () => {
        setCustomize(!customize)
        setCustomUrl('')
    }

    return (
        <label className="switch">
            <input type="checkbox" onChange={onChange} value={customize}/>
            <span className="slider round" />
        </label>
    );
}

export default Customize;
