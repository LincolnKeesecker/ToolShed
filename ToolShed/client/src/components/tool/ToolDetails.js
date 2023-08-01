import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getToolDetails } from "../../modules/toolManager"
import { Button, ButtonGroup, Card, CardBody } from "reactstrap";
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
                <Card className="m-5 p-5 bg-secondary bg-opacity-50 text-center">
                    <h1 className="bold">{tool.name}</h1>
                    <p>{tool.description}</p>
                    <p>{tool.condition.name}</p>

                </Card>
                <Card className="m-5 bg-secondary bg-opacity-50 p-5 text-center">
                    <Button
                        style={{
                            'padding-top': '3px',
                            'margin': 'auto',
                            'maxWidth': '14vw'
                        }}
                        color="secondary"
                        onClick={() => navigate(`/ToolComment/add/${tool.id}`)}
                    >
                        Add a Comment
                    </Button>

                    <h3 className="m-4 text-center">Comments:</h3>

                    {toolComments.length > 0 ?
                        toolComments.map((tool) => {
                            return <ToolComment toolComment={tool} />
                        }) : ""}
                    <CardBody />
                </Card>
            </>


        );
    }
}