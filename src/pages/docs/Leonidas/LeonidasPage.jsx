import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown';

import DocSidebar from '../../../components/DocSidebar/DocSidebar'
import "../Leonidas/LeonidasPage.css"

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import leonidas from "../../../utils/leonidas-parser"
import { trim_leonidas } from "../../../utils/leonidas-parser";
import useLeonidasCallback from "../../../utils/useLeonidasCallback";

import "katex/dist/katex.min.css";

export function CodeDocModule({ markdown, jsx, output, height, contentheight }) {
    //Text refs
    const [text, setText] = useState(markdown);
    const [selected, setSelected] = useState(1);

    //Leonidas refs
    const [remarkModules, setRemarkModules] = useState([]);
    const [rehypeModules, setRehypeModules] = useState([]);
    const [language, setLanguage] = useState("markdown");
    const [called, setCalled] = useState(false);

    const click_callback = (text, id) => {
        setText(text);
        setSelected(id);
        if (id === 1) {
            setLanguage("markdown");
        }
        else if (id === 2) {
            setLanguage("html");
        }
    }


    //Markdown aka Leonidas Callback
    useLeonidasCallback(() => {
        //Get our entire Description Object
        const desc_object = document.getElementsByClassName("codedocmarkdown");
        const nodes = [];
        //Get All the Child nodes
        if (desc_object[0]) {
            const child_nodes = desc_object[0].childNodes;
            child_nodes.forEach((e) => {
                e.childNodes.forEach((f) => {
                    if (f.nodeName.toString() == "IMG") {
                        nodes.push(f);
                    }
                })
            })
        }

        //Leonidas Node
        if (desc_object[0]) {
            let style = desc_object[0].style;
            const leo = leonidas(markdown, style);
            style = leo.values;
            if (called === false) {
                setRehypeModules(leo.modules.rehype);
                setRemarkModules(leo.modules.remark);
                setCalled(true);
            }
        }

    })

    return (
        <div className="codedocmodule" style={{ height: height }}>
            <button className="codedocbutton" onClick={() => click_callback(markdown, 1)}>Leonidas Input</button>
            <button className="codedocbutton" onClick={() => click_callback(jsx, 2)}>JSX</button>
            <button className="codedocbutton" onClick={() => click_callback(output, 3)}>Output</button>
            <div style={{ position: "absolute" }}>
                {selected !== 3
                    ? (
                        <SyntaxHighlighter language={language} style={dark} customStyle={{ width: "40vw", height: contentheight, marginTop: "70px" }}>
                            {text}
                        </SyntaxHighlighter>
                    )
                    :
                    <ReactMarkdown
                        className="codedocmarkdown"
                        remarkPlugins={remarkModules}
                        rehypePlugins={rehypeModules}>{trim_leonidas(markdown)}</ReactMarkdown>
                }
            </div>
        </div>
    )
}

export default function LeonidasPage() {
    //Current Item
    const [current, setCurrent] = useState(0);

    //Data
    const data = [
        {
            id: 1,
            type: "head",
            text: "Markdown",
            isHead: true,
        },
        {
            id: 2,
            type: "content",
            text: "Headings",
            isHead: false,
        },
        {
            id: 3,
            type: "content",
            text: "Default Font Styling",
            isHead: false,
        },
        {
            id: 4,
            type: "content",
            text: "Lists",
            isHead: false,
        },
        {
            id: 5,
            type: "content",
            text: "Media",
            isHead: false,
        },
        {
            id: 6,
            type: "head",
            text: "Leonidas Styling",
            isHead: true,
        },
        {
            id: 7,
            type: "content",
            text: "Properties",
            isHead: false,
        },
        {
            id: 8,
            type: "content",
            text: "Modules",
            isHead: false,
        },
        {
            id: 9,
            type: "content",
            text: "Themes",
            isHead: false,
        },
        {
            id: 10,
            type: "head",
            text: "Javascript",
            isHead: true,
        },
        {
            id: 11,
            type: "content",
            text: "XSS Prevention",
            isHead: false,
        },
        {
            id: 12,
            type: "content",
            text: "Integration",
            isHead: false,
        },
    ]

    //OnClick Callback
    const onClick = (e) => {
        console.log(e.id);
        setCurrent(parseInt(e.id))
    }

    //Itenary
    const Itenary = () => {
        const id = current;
        return (
            <>
                {id === 0 && (
                    <>
                        <div className="lpMain">
                            <p className="lpHeadings">Leonidas Documentation</p>
                            <p className="lpContent">
                                <strong className="gradientUnderline">Fulminata is Powered by Leonidas, an inhouse markdown extention, created specifically for Fulminata</strong>
                                <br />
                                Leonidas is Essentially Markdown of the future. It offers stuff like colours, background, and essentially all properties imaginable.
                                <br />
                                It offers <code>HTML</code>, <code>CSS</code>, and even basic <code>Javascript</code> and <code>PHP</code> compatibility.
                                <br />
                                Essentially, anything you can do in Markup HTML you can do here. It also has compatibility for stuff like forms, data-binding, etc.
                            </p>
                            <br />
                            <br />
                            <br />
                            <CodeDocModule
                                markdown={`@(fontSize:3vw)\n@(color:lightblue)\n\n\n# Hello World!`}
                                jsx={`<style>\n.1{font-size:2vw;color:lightblue;}\n</style>\n\n<div>\n  <h1 className="1"> Leonidas </h1> \n</div>`}
                                height="350px"
                                contentheight="200px" />
                        </div>
                    </>
                )}
                {id === 2 && (
                    <div className="lpMain">
                        <p className="lpHeadings">Headings</p>
                        <table className="codepropertymain">
                            <tr>
                                <th className="a1table codepropertyheading">Leonidas</th>
                                <th className="a2table codepropertyheading">JSX Tag</th>
                                <th className="a3table codepropertyheading">Description</th>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">#</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<h1>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">The Strongest and Largest Heading.</p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">##</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<h2>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    The Second Strongest and Largest Heading.
                                </p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">###</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<h3>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    The Third Strongest and Largest Heading.
                                </p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">####</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<h4>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    The Fourth Strongest and Largest Heading.
                                </p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">#####</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<h5>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    The Fifth Strongest and Largest Heading.
                                </p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">######</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<h6>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    The Sixth Strongest and Largest Heading.
                                </p></td>
                            </tr>
                        </table>
                        <br />
                        <br />
                        <br />
                        <p className="lpHeadings" style={{ fontSize: "30px" }}>View an Example!</p>
                        <CodeDocModule
                            markdown={`@(fontSize:1vw)\n@(color:white)\n\n\n# This is an h1\n## This is an h2\n### This is an h3\n#### This is an h4\n##### This is an h5\n###### This is an h6`}
                            jsx={`<style>\n.1{font-size:1vw;color:white;}\n</style>\n\n<div>\n  <h1 className="1"> This is an h1 </h1> \n  <h2 className="1"> This is an h2 </h2> \n  <h3 className="1"> This is an h3 </h3> \n  <h4 className="1"> This is an h4 </h4>\n  <h5 className="1"> This is an h5 </h5>\n  <h6 className="1"> This is an h6 </h6>\n</div>`}
                            height="450px"
                            contentheight="300px" />
                        <br />
                        <br />
                        <br />
                        <br />
                        <hr className="singlePosth1"></hr>
                    </div>
                )}
                {id === 3 && (
                    <div className="lpMain">
                        <p className="lpHeadings">Default Font Styling</p>
                        <table className="codepropertymain">
                            <tr>
                                <th className="a1table codepropertyheading">Leonidas</th>
                                <th className="a2table codepropertyheading">JSX Tag</th>
                                <th className="a3table codepropertyheading">Description</th>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">**This is Bold**</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<strong>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">Makes text <strong>bold</strong></p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">__This is Bold__</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<strong>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    Makes text <strong>bold</strong>
                                </p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">*This is Italic*</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<em>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    Makes Text <em>Italic</em>
                                </p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">_This is Italic_</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<em>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    Makes Text <em>Italic</em>
                                </p></td>
                            </tr>
                        </table>
                        <br />
                        <br />
                        <br />
                        <p className="lpHeadings" style={{ fontSize: "30px" }}>View an Example!</p>
                        <CodeDocModule
                            markdown={`@(fontSize:1vw)\n@(color:white)\n\n\n**bold**\n __bold__\n *italic*\n _italic_`}
                            jsx={`<style>\n.1{font-size:1vw;color:white;}\n</style>\n\n<div className="1">\n<strong> bold </strong>\n<strong> bold </strong>\n<em> italic </em>\n<em> italic </em>\n</div>`}
                            height="450px"
                            contentheight="300px" />
                        <br />
                        <br />
                        <br />
                        <br />
                        <hr className="singlePosth1"></hr>
                    </div>
                )}
                {id === 4 && (
                    <div className="lpMain">
                        <p className="lpHeadings">Lists</p>
                        <table className="codepropertymain">
                            <tr>
                                <th className="a1table codepropertyheading">Leonidas</th>
                                <th className="a2table codepropertyheading">JSX</th>
                                <th className="a3table codepropertyheading">Description</th>
                            </tr>
                            <tr>
                                <td>
                                    <code className="codepropertycode a1table"><br />
                                        {`1.Black`}<br />{`2.Brown`}<br />{`3.Purple`}
                                    </code>
                                </td>
                                <td className="codepropertyjsx a2table">
                                    <code>{`<ol>`}</code>
                                </td>
                                <td classname="a3table"><p className="codepropertydesc">Ordered Lists. Can start with offet or without</p></td>
                            </tr>
                            <br />
                            <tr>
                                <td><code className="codepropertycode a1table"><br />
                                    {`- Black`}<br />{`- Brown`}<br />{`- Purple`}</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<ul>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    Unordered Lists. Can start with - , * and +
                                </p></td>
                            </tr>
                        </table>
                        <br />
                        <br />
                        <br />
                        <p className="lpHeadings" style={{ fontSize: "30px" }}>View an Example!</p>
                        <CodeDocModule
                            markdown={`@(fontSize:2vw)\n@(color:white)\n\n\n
1. Black
2. Brown
3. Purple

- Black
- Brown
- Purple`}
                            jsx={`<style>\n.1{font-size:2vw;color:white;}\n</style>\n\n<div className="1">
  <ol>
     <li>Black</li>
     <li>Brown</li>
     <li>Purple</li>
  </ol>
  <br />
  <ul>
    <li>Black</li>
    <li>Brown</li>
    <li>Purple</li> 
  </ul>
</div>`}
                            height="550px"
                            contentheight="400px" />
                        <br />
                        <br />
                        <br />
                        <br />
                        <hr className="singlePosth1"></hr>
                    </div>
                )}
                {id === 5 && (
                    <div className="lpMain">
                        <p className="lpHeadings">Media</p>
                        <table className="codepropertymain">
                            <tr>
                                <th className="a1table codepropertyheading">Leonidas</th>
                                <th className="a2table codepropertyheading">JSX</th>
                                <th className="a3table codepropertyheading">Description</th>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">![alt](path)</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<img>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">Images : First is the text<br />  if the image doesn't load in, <br />second is the path or link to your image</p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">[name](link)</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<a>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    Links : First is the name of the link,<br /> second is the url
                                </p></td>
                            </tr>
                            <tr>
                                <td><code className="codepropertycode a1table">{"<youremail>"}</code></td>
                                <td className="codepropertyjsx a2table"><code>{"<address>"}</code></td>
                                <td classname="a3table"><p className="codepropertydesc">
                                    Displays Email Adress
                                </p></td>
                            </tr>
                        </table>
                        <br />
                        <br />
                        <br />
                        <p className="lpHeadings" style={{ fontSize: "30px" }}>View an Example!</p>
                        <CodeDocModule
                            markdown={`@(fontSize:1vw)\n@(color:black)\n@(backgroundColor:lightblue)\n
# Image
![image](https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=140)

# Link
[Link to Picture](https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=140)

# Email
<youremail@gmail.com>
`}
                            jsx={`<style>\n.1{font-size:1vw;color:black;background-color:white}\n.imgBuffer{}\n.aBuffer{}\n.addressBuffer{}\n</style>\n\n<div className="1">
<h1>Image</h1>
<img 
  alt="image" 
  src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=140" 
/>
<h1>Link</h1>
<a href="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350&w=140" alt="Link to Picture"/>
<h1>Email</h1>
<address>youremail@gmail.com</address>
</div>`}
                            height="600px"
                            contentheight="450px" />
                        <br />
                        <br />
                        <br />
                        <br />
                        <hr className="singlePosth1"></hr>
                    </div>
                )}
                {id === 7 && (
                    <>
                        <div className="lpMain">
                            <p className="lpHeadings">Adding Properties to CSS</p>
                            <p className="lpContent">
                                Fulminata is powered by <code>React</code>. Hence it uses the <code>React</code> default CSS Properties.<br />
                                You can Read the Docs for that <a href="https://reactjs.org/docs/dom-elements.html#style" className="link" style={{ color: "lightblue" }}>Here</a>
                            </p>
                            <br />
                            <p className="lpContent" style={{fontSize:"2vw"}}>
                                <strong>To add a css element to your markdown, use the <code>@</code> identifier</strong>
                            </p>
                            <p className="lpContent">
                                <br />
                                For Example, if you want to add a lightblue background color you would do this :
                            </p>
                            <p className="lpContent">
                                <code>@(backgroundColor:lightblue)</code>
                            </p>
                            <p className="lpContent">
                                <br />
                                To Increase the font size, you would do this :
                            </p>
                            <p className="lpContent">
                                <code>@(fontSize:10vw)</code>
                            </p>
                            <p className="lpContent">
                                <br />
                                To Add a border, you would do this :
                            </p>
                            <p className="lpContent">
                                <code>@(border : 20px dotted orange)</code>
                            </p>
                            <br />
                            <br />
                            <p className="lpContent">
                                <br />
                                All Units are supported : vw, vh, px, %, inch, cm.
                                <br />
                                Theoretically all <code>CSS</code> properties are supported. 
                                <br />
                                If a property gets repeated the last one will be accounted for
                            </p>
                            <br />
                            <p className="lpContent">
                                <strong>The Leonidas versions of CSS properties should have the same names, but names which have a "-" in them will change</strong>
                            </p>
                            <p className="lpContent">
                                For example, <code>background-color</code> will change to <code>backgroundColor</code>, <code>margin-left</code> will change to <code>marginLeft</code>
                                <br />
                                This is due to Programming Language Restrictions and React Compatibility.
                            </p>
                            <p className="lpHeadings">View an Example !</p>
                            <CodeDocModule
                                markdown={`@(fontSize:2.5vw)
@(color:lightblue)
@(textAlign:center)
@(fontKerning:none)
@(fontWeight:500)
@(letterSpacing:10px)
@(outline: 5px solid white)
@(textShadow: 2px 5px magenta)
@(transform: skewY(-10deg)
@(zoom:1.2)
@(marginBottom:100px)

# Leonidas!`}
                                jsx={`<style>
.1{
    font-size : 2.5vw;
    color : lightblue;
    text-align : center;
    font-kerning : none;
    font-weight : 500;
    letter-spacing : 10px;
    outline : 5px solid white;
    text-shadow : 2px 5px magenta;
    transform : skewY(10deg);
    zoom : 1.2;
    margin-bottom : 100px;
}
</style>
<div>
 <h1 className="1"> Leonidas!</h1> 
</div>`}
                                height="600px"
                                contentheight="450px" />
                        </div>
                    </>
                )}

            </>
        )
    }

    return (
        <>
            <div className="lpPos">
                <DocSidebar data={data} onClick={onClick} />
            </div>
            <Itenary />
        </>
    )
}
