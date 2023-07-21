import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "reactstrap";

export default function Tool({ tool }) {

    const navigate = useNavigate();
    const handleTitleClick = (event) => {
        navigate(`/toolDetails/${tool.id}`)
    }

    return (
        <Card className="m-5 text-center" style={{ 'borderRadius': '20px' }}>
            <button style={{ 'borderRadius': '20px' }} onClick={(clickEvent) => handleTitleClick(clickEvent)}>
                <h3>{tool.name}</h3>
            </button>
        </Card>
    )
}