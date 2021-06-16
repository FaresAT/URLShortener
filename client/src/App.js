import Header from './components/Header/Header'
import Customize from "./components/Customize/Customize";
import ShortField from './components/ShortField/ShortField'
import ShortLink from "./components/ShortLink/ShortLink"
import ErrorMsg from './components/ErrorMsg/ErrorMsg'

import './App.css'

import { useState } from 'react'

const App = () => {
    const [urlToShorten, setUrlToShorten] = useState('')
    const [shortenedUrl, setShortenedUrl] = useState('')
    const [err, setErr] = useState('')
    const [customURL, setCustomURL] = useState('')
    const [customize, setCustomize] = useState(false)

    return (
        <div className={'app'}>
            <Header />
            <div className={'shortening'}>
                <div className={'spacing'}>
                    <Customize setCustomize={setCustomize} customize={customize} setCustomUrl={setCustomURL} />
                    <label>Use Custom URL?</label>
                </div>
                    <ShortField
                        url={urlToShorten}
                        urlChange={setUrlToShorten}
                        setShortened={setShortenedUrl}
                        setErr={setErr}
                        customize={customize}
                        customURL={customURL}
                        setCustomURL={setCustomURL}
                    />
            </div>
            <div>
                {err ? ( <ErrorMsg err={err}/> ) : ( <ShortLink newUrl={shortenedUrl}/> )}
            </div>
        </div>
    )
};

export default App;
