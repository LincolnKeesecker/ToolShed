import { useEffect, useState } from "react";
import Tool from "./Tool";
import { getAllTools } from "../../modules/toolManager";

export default function ToolList() {
    const [tools, setTools] = useState([]);

    useEffect(() => {
        getAllTools().then(setTools);
    }, []);

    return (
        <>
            <h1 className="text-center">Your ToolShed</h1>
            <section>
                {tools.map((t) => (
                    <Tool key={tools.id} tool={t} />
                ))}
            </section>
        </>
    )
}