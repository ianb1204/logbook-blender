import './Body.scss'

const Body = (props) => {

    if(!props.children) return null

    let cn = "Body"
    cn += (props.size ? " " + props.size : " medium")
    cn += (props.weight ? " w" + props.weight : " w400")
    if(props.overflow && props.maxWidth) cn += ' overflow'
    if(props.uppercase) cn += " uppercase"
    if(props.noUserSelection) cn += " noUserSelection"
    if(props.primary) cn += " primary"
    if(props.underline) cn += " underline"
    if(props.hoverable) cn += " hoverable"
    if(props.white) cn += " white"
    if(props.capitalize) cn += " capitalize"

    return (
        <p className={cn} style={{maxWidth:props.maxWidth ?? "auto"}}>{props.children}</p>
    )
}

export default Body