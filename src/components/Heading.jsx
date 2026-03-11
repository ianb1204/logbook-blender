import './Heading.scss'

const Heading = (props) => {

    if(!props.children) return null

    let cn = 'Heading'
    cn += (props.size ? " " + props.size : " xl")
    cn += (props.weight ? " w" + props.weight : " w700")
    if(props.centered) cn += " centered"
    if(props.uppercase) cn += " uppercase"
    if(props.capitalize) cn += " capitalize"

    return (
        props.type === "h1" ? <h1 className={cn}>{props.children}</h1>
        : props.type === "h2" ? <h2 className={cn}>{props.children}</h2>
        : props.type === "h3" ? <h3 className={cn}>{props.children}</h3>
        : props.type === "h4" ? <h4 className={cn}>{props.children}</h4>
        : props.type === "h5" ? <h5 className={cn}>{props.children}</h5>
        : props.type === "h6" ? <h6 className={cn}>{props.children}</h6>
        : <h1 className={cn}>{props.children}</h1>
    )
}

export default Heading