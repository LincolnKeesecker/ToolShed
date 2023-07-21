import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getToolDetails } from "../../modules/toolManager"

export default function ToolDetails() {
    const { id } = useParams(),
        [t, setT] = useState({})

    useEffect(() => {
        getToolDetails(id).then(setT)
    }, [])

    if (t === null) {
        return <p>404 not found</p>
    }
    else {
        return (
            <div className="m-4 text-center">
                <h1 className="bold">{t.name}</h1>
                <p>{t.description}</p>
                <p>{t.conditionId.name}</p>
            </div>
        );
    }
}