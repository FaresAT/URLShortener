import { useState } from 'react'
import axios from 'axios'

const ShortField = ({url, urlChange, setShortened, seterr}) => {
    const [customURL, setcustomURL] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            let response = await axios.post("http://localhost:5000/", {url, customURL})
            seterr('')
            setShortened(response.data)
        } catch (e) {
            console.log(e)
            seterr(e.response.data)
            setShortened('')
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <label>URL</label>
            <input
            type='text'
            placeholder='Enter URL'
            value={url}
            onChange={(e) => urlChange(e.target.value)}
            />
            <label>Custom URL</label>
            <input
            type={'text'}
            placeholder={'Enter your custom URL'}
            value={customURL}
            onChange={(e) => setcustomURL(e.target.value)}
            />
            <input type={'submit'} value={'Shorten'}/>
        </form>
    )
};

export default ShortField;