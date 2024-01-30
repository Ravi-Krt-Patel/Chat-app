
export const Message = ({message, user, ownCheck} : {message :string, user: any, ownCheck: boolean}) => {

    const selfMessageFloat = ownCheck

    return (<>
    <div style={{
        backgroundColor: selfMessageFloat?'#ff4b2b': '#ff416c',
        width: '50%',
        padding: '1vmax',
        margin: '1vmax',
        borderRadius: '0.5vmax',
        display: 'inline-block',
        clear: 'both',
        color: 'black',
        float: selfMessageFloat ? 'right' : 'left'
    }} >
        {message}
    </div>
    
    </>)
}