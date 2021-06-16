import './ErrorMsg.css'

const ErrorMsg = ({err}) => {

    return (
        <div className={"error"}>
            <i>Error: {err}</i>
        </div>
    )
};

export default ErrorMsg;