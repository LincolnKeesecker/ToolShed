import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getToolDetails } from "../../modules/toolManager"

export default function ToolDetails() {
    const { id } = useParams(),
        [tool, setTool] = useState({})

    useEffect(() => {
        getToolDetails(id).then(setTool)
    }, [])

    if (tool === null) {
        return <p>404 not found</p>
    }
    else {
        return (
            <div className="m-4 text-center">
                <h1 className="bold">{tool.name}</h1>
                <p>{tool.description}</p>
                <p>{tool.condition.name}</p>
            </div>
        );
    }
}