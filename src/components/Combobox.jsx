import Body from './Body'
import './Combobox.scss'
import { useEffect, useRef, useState } from 'react'
import ChevronDown from "./../assets/chevron_down.svg"
import { useTranslation } from 'react-i18next'

const Combobox = (props) => {
    const {t} = useTranslation()
    const [opened, setOpened] = useState(false)
    const openedRef = useRef(opened)

    const [position, setPosition] = useState({});

    const triggerRef = useRef(null);
    const optionsRef = useRef(null)

    useEffect(()=>{
        window.addEventListener('wheel', handleWheel, { passive: true })
        window.addEventListener('mousedown', handleClickOutside, { passive: true })

        return () => {
            window.removeEventListener('wheel', handleWheel)
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleWheel = (e) => {
        if(openedRef.current) {
            const target = e.target;

            if (optionsRef.current?.contains(target)) {
                return;
            }

            setOpened(false)
            openedRef.current = false
        }
    }

    const handleClickOutside = (e) => {
        if(openedRef.current) {
            const target = e.target;

            if (optionsRef.current?.contains(target) || triggerRef.current?.contains(target)) {
                return;
            }

            setOpened(false)
            openedRef.current = false
        }
    }

    const calculatePosition = () => {
        if (!triggerRef.current || !optionsRef.current) return;

        const triggerRect = triggerRef.current.getBoundingClientRect();
        const optionsRect = optionsRef.current.getBoundingClientRect();

        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        const spaceBottom = viewportHeight - triggerRect.bottom;
        const spaceTop = triggerRect.top;
        const spaceRight = viewportWidth - triggerRect.left;
        const spaceLeft = triggerRect.right;

        const newPosition = {};

        if (spaceBottom >= optionsRect.height) {
            newPosition.top = triggerRect.height;
        } else if (spaceTop >= optionsRect.height) {
            newPosition.bottom = triggerRect.height;
        } else {
            newPosition.top = Math.max(
                0,
                viewportHeight - optionsRect.height - triggerRect.top
            );
        }

        if (spaceRight >= optionsRect.width) {
            newPosition.left = 0;
        } else if (spaceLeft >= optionsRect.width) {
            newPosition.right = 0;
        } else {
            newPosition.left = Math.max(
                0,
                viewportWidth - optionsRect.width - triggerRect.left
            );
        }

        setPosition(newPosition);
    }

    useEffect(() => {
        if (openedRef.current) {
            requestAnimationFrame(calculatePosition);
        }
    }, [openedRef.current]);

    const onOptionClicked = (option) => {
        if(!props.disabled) {
            props.onChange(option.id)
            setOpened(false)
            openedRef.current = false
        }
    }

    const onHeaderClicked = () => {
        if(!props.disabled) {
            setOpened(!openedRef.current)
            openedRef.current = !openedRef.current
        }
    }

    const selectedOption = props.options.find((o) => o.id === props.selected)

    if(!selectedOption) return null

    return (
        <div className="Combobox">
            {props.title && <div className="ComboboxTitle">
                <Body>{t(props.title)}</Body>
            </div>}
            <div ref={triggerRef} className={"ComboboxContainer" + (props.disabled ? " disabled" : "") + (opened ? ' opened' : "")}>
                <div className="ComboboxHeader" onClick={onHeaderClicked}>
                    <Body>{selectedOption.noIntl ? selectedOption.label : t(selectedOption.label)}</Body>
                    <div className="ArrowIcon">
                        <img src={ChevronDown} alt='Chevron icon'/>
                    </div>
                </div>
                <div className="Options" ref={optionsRef} style={{
                    ...position,
                }}>
                    {props.options.map((option, index) => (
                        <div key={"option-"+props.id+"-"+index} className={"Option" + (props.selected === option.id ? " selected" : "")} onClick={()=>onOptionClicked(option)}>
                            <Body>{option.noIntl ? option.label : t(option.label)}</Body>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Combobox