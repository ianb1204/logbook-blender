import './Button.scss'
import Body from './Body'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Button = (props) => {
    const {t} = useTranslation()

    const [hover, setHover] = useState(false)

    let classnames = "Button"
    if(props.image && !props.label) classnames += " icon"
    if(props.disabled) classnames += " disabled"
    if(props.full) classnames += " full"
    classnames += (props.size ? " " + props.size : " medium")
    classnames += (props.animation ? " " + props.animation : " hover")
    classnames += (props.type ? ( props.type === "link" ? " nude" : " " + props.type) : " primary")

    const onButtonClicked = (e) => {
        if(props.onClick && !props.disabled) props.onClick(e)
    }

    if((!props.label && !props.image) || (props.type === "link" && !props.label) || !props.onClick) return null

    return (
        <div className={classnames} onClick={(e)=>onButtonClicked(e)} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}>
            {props.label && <Body underline={props.type === "link"} primary={props.type === "link"} hoverable={props.type === "link"} white={props.type === "primary" || !props.type}>{t(props.label)}</Body>}
            {props.image && <img src={props.image} alt='Button image'/>}
        </div>
    )
}

export default Button