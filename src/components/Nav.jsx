import { useTranslation } from 'react-i18next'
import Heading from './Heading'
import './Nav.scss'
import Body from './Body'
import Combobox from './Combobox'
import { useEffect, useRef, useState } from 'react'
import BurgerIcon from '../assets/burger.svg'
import Button from './Button'

const Nav = (props) => {
    const {t, i18n} = useTranslation()
    const [hoveredOption, setHoveredOption] = useState()
    const [opened, setOpened] = useState(false)
    const openedRef = useRef(opened)

    useEffect(()=>{
        window.addEventListener('resize', handleResize)

        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const handleResize = (e) => {
        if(openedRef.current && e.target.innerWidth > 1024) {
            setOpened(false)
            openedRef.current = false
        }
    }

    const languageOptions = [{id:"fr", label:'fr-label'}, {id:'en', label:'en-label'}]

    const toggleLanguage = (languageId) => {
        if(languageId === 'fr' || languageId === 'en') {
            props.setCurrentPage(languageId, '')
            if(openedRef.current) {
                setOpened(false)
                openedRef.current = false
            }
        } 
    }

    const onOptionClicked = (optionId) => {
        if(props.setCurrentPage) {
            props.setCurrentPage(i18n.language, optionId)
            if(openedRef.current) {
                setOpened(false)
                openedRef.current = false
            }
        }
    }

    if(!props.breadcrumbs || Object.keys(props.breadcrumbs).length === 0) return 

    return (
        <div className="Nav">
            <div className={"NavContainer" + (openedRef.current ? ' opened' : "")}>
                <div className="NavTitle">
                    <button className="Title" onClick={() => onOptionClicked("")}>
                        <Heading size={'m'}>{'Blender Logbook'}</Heading>
                    </button>
                </div>
                <div className="NavContent">
                    <div className="NavOptions">
                        {Object.keys(props.breadcrumbs).map((pageKey, pageId) => (
                            pageKey !== "home" && <button onMouseEnter={()=>setHoveredOption(pageKey)} onMouseLeave={()=>setHoveredOption()} onClick={()=>onOptionClicked(pageKey)} className={"NavOption" + (props.currentPage === pageKey ? " current" : "")} key={"nav-page-" + pageId}>
                                <Body primary={hoveredOption === pageKey || props.currentPage === pageKey}>{pageKey}</Body>
                            </button>
                        ))}
                    </div>
                    <div className="NavSettings">
                        <Combobox selected={i18n.language} options={languageOptions} onChange={toggleLanguage}/>
                    </div>
                </div>
                <div className="NavBurger">
                    <Button image={BurgerIcon} type={'secondary'} size={'large'} onClick={()=>{setOpened(!openedRef.current);openedRef.current = !openedRef.current}}/>
                </div>
            </div>
        </div>
    )
}

export default Nav