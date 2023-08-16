import { useEffect, useState } from "react";
import Tool from "./Tool";
import { getAllTools, searchTools } from "../../modules/toolManager";

export default function ToolList() {
    const [tools, setTools] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        searchTools(searchTerm).then(tools => setTools(tools));
    };

    useEffect(() => {
        getAllTools().then(setTools);
    }, []);



    return (
        <>
            <h1 className="m-5 text-center">All Tools in ToolSheds</h1>
            <div>
                <input
                    style={{
                        'display': 'block',
                        'width': '50%',
                        'borderRadius': '5px',
                        'margin': 'auto',
                        'margin-top': '10px',
                        'margin-bottom': '3px'
                    }}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </ div>
            <div>
                <button
                    style={{
                        'display': 'block',
                        'borderRadius': '5px',
                        'margin': 'auto',
                        'margin-bottom': '10px'
                    }}
                    onClick={handleSearch}
                >Search</button>
            </div>
            <section>
                {tools.map((t) => (
                    <Tool key={t.id} tool={t} />
                ))}
            </section>
        </>
    )
}