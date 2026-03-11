import './MarkdownReader.scss'
import "highlight.js/styles/github.css";
import 'github-markdown-css/github-markdown-light.css'

import { useEffect, useState } from 'react';
import Markdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import remarkDirective from "remark-directive"
import {visit} from "unist-util-visit";

import Grid from './markedown/Grid';
import Card from './markedown/Card';

const MarkdownReader = (props) => {
    const [content, setContent] = useState("");

    useEffect(() => {
        if(!props.file) return
        
        props.file().then(module => {
            setContent(module.default);
        });
    }, [props.file]);

    const remarkDirectiveToReact = () => {
        return (tree) => {
            visit(
                tree,
                ["textDirective", "leafDirective", "containerDirective"],
                (node) => {
                    node.data = {
                        hName: node.name,
                        hProperties: node.attributes,
                        ...node.data
                    };
                    return node;
                }
            );
        };
    }

    return (
        <div className="MarkdownReader markdown-body">
            <Markdown 
                remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveToReact]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    card:Card,
                    cards:Grid,
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}

export default MarkdownReader