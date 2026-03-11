import { useEffect, useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";

const MarkedownReader = (props) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        if(!props.file) return
        
        props.file().then(module => {
            setContent(module.default);
        });
    }, [props.file]);

    return (
        <Markdown remarkPlugins={[remarkGfm]}>
            {content}
        </Markdown>
    )
}

export default MarkedownReader