export const Key = ({ long, letter }) => {
    return (
        <>

            <div className={long === 'true' ? ("key long-key") : ("key")}>
                {letter}
            </div>
        </>
    )
}

Key.defaultProps = {
    long: 'false'
}

export default Key;