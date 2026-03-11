import React, { useEffect, useRef, useState } from 'react'
import Body from './Body'
import DoubleChevronRight from "./../assets/double_chevron_right.svg"
import './Menu.scss'

const Menu = (props) => {
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

    const onItemClicked = (path) => {
        if(props.setCurrentPath) {
            props.setCurrentPath(path)
            if(openedRef.current){
                setOpened(false)
                openedRef.current = false
            }
        }
    }

    const renderBreadcrumbs = (breadcrumbs, parentKeys) => {
        if(!breadcrumbs) return

        return (
            <div className="MenuContainer" key={"menu"}>
                {Object.keys(breadcrumbs).map((sPageKey, sPageId) => (
                    sPageKey !== "home" && (
                        <React.Fragment key={"menu-spage-" + sPageKey + "-" + sPageId}>
                            <button onClick={()=>{onItemClicked(sPageKey !== "home" ? [...parentKeys, sPageKey] : parentKeys)}} className={"MenuContent" + (sPageKey === props.currentPage ? " current" : "")}>
                                <Body hoverable primary={sPageKey === props.currentPage} capitalize>{sPageKey !== "home" ? sPageKey : parentKeys[parentKeys.length-1]}</Body>
                            </button>
                            {typeof breadcrumbs[sPageKey] !== "string" && renderBreadcrumbs(breadcrumbs[sPageKey], [...parentKeys, sPageKey])}
                        </React.Fragment>
                    )
                ))}
            </div>
        )
    }

    if(!props.currentTab || (!props.breadcrumbs || Object.keys(props.breadcrumbs).length < 2)) return

    return(
        <div className={"Menu" + (openedRef.current ? " opened" : "")}>
            <button className="MenuTitle" onClick={()=>onItemClicked([props.currentTab])}>
                <Body capitalize hoverable weight={"700"} size={"large"}>{props.currentTab}</Body>
            </button>
            {renderBreadcrumbs(props.breadcrumbs, [props.currentTab])}
            <button className="ToggleMenuButton" onClick={()=>{setOpened(!openedRef.current);openedRef.current = !openedRef.current}}>
                <img src={DoubleChevronRight} alt='Double chevron icon'/>
            </button>
        </div>
    )
}

export default Menu