import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToolDetails } from "../../modules/toolManager"
import { Button, Card } from "reactstrap";
import ToolComment from "../comment/ToolComment";
import { getToolComments } from "../../modules/toolCommentManager";

export default function ToolDetails() {
    const { id } = useParams(),
        [tool, setTool] = useState()

    const navigate = useNavigate();

    const [toolComments, setToolComments] = useState([]);

    useEffect(() => {
        getToolDetails(id).then(setTool)
        getToolComments(id).then(setToolComments)
    }, [])

    if (!tool) {
        return <p>404 not found</p>
    }
    else {
        return (
            <>
                <Card className="m-4 text-center">
                    <h1 className="bold">{tool.name}</h1>
                    <h2>{tool.description}</h2>
                    <h3>{tool.condition.name}</h3>

                </Card>
                <Card className="m-4 text-center">
                    <Button
                        color="secondary"
                        onClick={() => navigate(`/ToolComment/add/${tool.id}`)}
                        style={{
                            'borderRadius': '20px',
                            'margin': '10px'
                        }}>
                        Add a Comment
                    </Button>

                    <h3 className="m-4 text-center">Comments:</h3>

                    {toolComments.length > 0 ?
                        toolComments.map((tool) => {
                            return <ToolComment toolComment={tool} />
                        }) : ""}
                </Card>
            </>


        );
    }
}