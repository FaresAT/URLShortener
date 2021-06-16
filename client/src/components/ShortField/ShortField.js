import axios from 'axios'
import './ShortField.css'

const ShortField = ({url, urlChange, setShortened, setErr, customize, customURL, setCustomURL}) => {
    const onSubmit = async (e) => {
        e.preventDefault()

        await axios.post("http://localhost:5000/", {url, customURL}).then((apiResponse) => {
            setErr('')
            setShortened(apiResponse.data)
        }).catch((error) => {
            console.log(error.message)
            setErr(error.response.data.message)
            setShortened('')
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <div className={'space'}>
                <label className="field field_v2">
                    <input className="field__input"
                           placeholder="Your Custom URL"
                           disabled={!customize}
                           type={'text'}
                           value={customURL}
                           onChange={(e) => setCustomURL(e.target.value)}
                    />
                        <span className="field__label-wrap">
                          <span className="field__label">Custom URL</span>
                        </span>
                </label>

                <label className="field field_v2">
                    <input className="field__input"
                           type='text'
                           placeholder='Enter URL'
                           value={url}
                           onChange={(e) => urlChange(e.target.value)}
                    />
                    <span className="field__label-wrap">
                          <span className="field__label">URL</span>
                        </span>
                </label>
            </div>

            <div className="frame">
                <button type={'submit'} className="custom-btn btn-3"><span color={'#ffffff'}>Shorten</span></button>
            </div>

        </form>
    )
};

export default ShortField;