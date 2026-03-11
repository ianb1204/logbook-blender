import './MarkdownReader.scss'
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";

const MarkdownReader = (props) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        if(!props.file) return
        
        props.file().then(module => {
            setContent(module.default);
        });
    }, [props.file]);

    return (
        <div className="MarkdownReader">
            <Markdown remarkPlugins={[remarkGfm]}>
                {content}
            </Markdown>
        </div>
    )
}

export default MarkdownReader