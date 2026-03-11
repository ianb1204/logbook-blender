import './MarkdownReader.scss'
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import 'github-markdown-css/github-markdown-light.css'

const MarkdownReader = (props) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        if(!props.file) return
        
        props.file().then(module => {
            setContent(module.default);
        });
    }, [props.file]);

    return (
        <div className="MarkdownReader markdown-body">
            <Markdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {content}
            </Markdown>
        </div>
    )
}

export default MarkdownReader