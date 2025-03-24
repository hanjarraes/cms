import { useState } from "react";
import Editor from "@monaco-editor/react";

const LiveEditor: React.FC = () => {
    const [html, setHtml] = useState<string>("<h1>Hello, World!</h1>");
    const [css, setCss] = useState<string>("h1 { color: blue; text-align: center; }");
    const [js, setJs] = useState<string>("console.log('Hello from JavaScript!');");

    const generatePreview = () => {
        return `
            <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
            </html>
        `;
    };

    return (
        <div className="grid grid-cols-2 gap-4 flex-grow">
            {/* Code Editor Section */}
            <div className="grid grid-rows-3 gap-2">
                {/* HTML Editor */}
                <div className="bg-[--blue-v2] p-3 rounded shadow-md">
                    <h2 className="text-lg font-semibold">HTML</h2>
                    <Editor
                        height="180px"
                        defaultLanguage="html"
                        defaultValue={html}
                        theme="vs-dark"
                        onChange={(value) => setHtml(value || "")}
                    />
                </div>

                {/* CSS Editor */}
                <div className="bg-[--blue-v2] p-3 rounded shadow-md">
                    <h2 className="text-lg font-semibold">CSS</h2>
                    <Editor
                        height="180px"
                        defaultLanguage="css"
                        defaultValue={css}
                        theme="vs-dark"
                        onChange={(value) => setCss(value || "")}
                    />
                </div>

                {/* JavaScript Editor */}
                <div className="bg-[--blue-v2] p-3 rounded shadow-md">
                    <h2 className="text-lg font-semibold">JavaScript</h2>
                    <Editor
                        height="180px"
                        defaultLanguage="javascript"
                        defaultValue={js}
                        theme="vs-dark"
                        onChange={(value) => setJs(value || "")}
                    />
                </div>
            </div>

            {/* Live Preview Section */}
            <div className="bg-[--blue-v2] p-3 rounded flex flex-col  shadow-md">
                <h2 className="text-lg font-semibold">Preview</h2>
                <iframe
                    className="w-full flex-grow bg-white"
                    srcDoc={generatePreview()}
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </div>
    );
};

export default LiveEditor;
