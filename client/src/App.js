import Header from './components/Header/Header'
import ShortField from './components/ShortField/ShortField'
import ShortLink from "./components/ShortLink/ShortLink"
import ErrorMsg from './components/ErrorMsg/ErrorMsg'
import About from './components/About/About'

import './App.css'

import { useState } from 'react'

const App = () => {
    const [urlToShorten, seturlToShorten] = useState('')
    const [shortenedUrl, setshortenedUrl] = useState('')
    const [err, seterr] = useState('')

    return (
        <div className={'app'}>
            <Header />
            <ShortField
                url={urlToShorten}
                urlChange={seturlToShorten}
                setShortened={setshortenedUrl}
                seterr={seterr}
            />
            <div>
                {err ? ( <ErrorMsg err={err}/> ) : ( <ShortLink newUrl={shortenedUrl}/> )}
            </div>
            <About />
        </div>
    )
};

export default App;
