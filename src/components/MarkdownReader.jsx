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
import Body from './Body';
import Heading from './Heading';
import Button from './Button';

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
                    grid:Grid,
                    button:({type, label}) => {
                        console.log(type, label)
                        return <Button type={type} label={label} onClick={()=>{console.log("oui")}}/>
                    },
                    p: ({children}) => {
                        return <Body>{children}</Body>
                    },
                    h1:({children}) => {
                        return <Heading type={"h1"} size={'l'}>{children}</Heading>
                    },
                    h2:({children}) => {
                        return <Heading type={"h2"} size={'m'}>{children}</Heading>
                    },
                    h3:({children}) => {
                        return <Heading type={"h3"} size={'s'}>{children}</Heading>
                    },
                    h4:({children}) => {
                        return <Heading type={"h4"} size={'xs'}>{children}</Heading>
                    },
                    h5:({children}) => {
                        return <Heading type={"h5"} size={'xs'}>{children}</Heading>
                    },
                    h6:({children}) => {
                        return <Heading type={"h6"} size={'xs'}>{children}</Heading>
                    },
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}

export default MarkdownReader