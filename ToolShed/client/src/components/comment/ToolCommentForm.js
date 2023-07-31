import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { AddToolComment } from "../../modules/toolCommentManager";
import { Card, Form, Button, Col, FormGroup, Input, Label } from "reactstrap";
import { getToolDetails } from "../../modules/toolManager";

const ToolCommentForm = ({ user }) => {
    const navigate = useNavigate();
    const [body, setbody] = useState();
    const [tool, setTool] = useState();
    const { toolId } = useParams();
    getToolDetails(toolId).then(setTool);

    const submitToolComment = (e) => {
        e.preventDefault();
        const toolComment = {
            body,
            userId: user.id,
            toolId: tool.id
        }

        AddToolComment(toolComment).then((toolComment) => { navigate(`/toolList`) });
    };

    return (
        <>
            <Card className="m-5 text-center" style={{
                'borderRadius': '20px',
            }}>
                < Form onSubmit={submitToolComment}>
                    <FormGroup row>
                        <Label htmlFor="body" className="m-4 text-center">New Comment:</Label>
                        <Col>
                            <Input
                                type="text"
                                description="body"
                                onChange={(e) => setbody(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <Button
                        id="toolComment-save-button"
                        style={{
                            'borderRadius': '20px',
                            'margin': '10px'
                        }}
                        color="success"
                        type="submit">
                        Save
                    </Button>
                </Form>
            </ Card>
        </>
    )
}

export default ToolCommentForm;