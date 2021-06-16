import "./ShortLink.css"

const ShortLink = ({newUrl}) => {
    return (
        <div>
            {/*<a className={'success'}href={newUrl}>{newUrl}</a>*/}
            {newUrl==='' ? null : <a className={'success'} href={newUrl}>{newUrl}</a>}
        </div>
    )
};

export default ShortLink;