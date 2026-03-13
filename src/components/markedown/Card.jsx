import { useTranslation } from 'react-i18next';
import './Card.scss'
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
    const {i18n} = useTranslation()
    const navigate = useNavigate()

    const childrenArray = Array.isArray(props.children) ? props.children : [props.children];

    const hrIndex = childrenArray.findIndex(
        child => child?.type === "hr"
    );

    const header = hrIndex !== -1 
        ? childrenArray.slice(0, hrIndex) 
        : childrenArray;

    const content = hrIndex !== -1 
        ? childrenArray.slice(hrIndex + 1) 
        : [];

    const renderCardContainer = () => {
        return (
            <div className="CardContainer">
                <div className="CardContent">
                    {header}
                </div>  
                <div className="CardDivider"></div>
                <div className="CardContent">
                    {content}
                </div>
            </div>
        )
    }

    return (
        props.link ?
        <button className='Card' onClick={()=>{navigate('/' + i18n.language + "/" + props.link)}}>
            {renderCardContainer()}
        </button>
        :
        <div className="Card">
            {renderCardContainer()}
        </div>
    )
}

export default Card