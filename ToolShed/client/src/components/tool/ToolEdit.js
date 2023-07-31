import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getAllConditions } from "../../modules/conditionManager";
import { editTool } from "../../modules/toolManager";
import { Form, Button, Col, FormGroup, Input, Label, Card } from "reactstrap";
import { getToolDetails } from "../../modules/toolManager";

export const ToolEdit = ({ user }) => {
    const navigate = useNavigate();
    const [condition, setCondition] = useState();
    const [updateTool, setUpdateTool] = useState({
        id: 0,
        name: "",
        description: "",
        conditionId: 0,
    });
    const [currentTool, setCurrentTool] = useState({});
    const { id } = useParams();

    useEffect(
        () => {
            if (currentTool.hasOwnProperty("id")) {
                const copy = { ...updateTool };
                copy.id = currentTool.id;
                copy.name = currentTool.name;
                copy.description = currentTool.description;
                copy.conditionId = currentTool.conditionId;
                copy.userId = user.id
                setUpdateTool(copy);
            }
        },
        [currentTool]
    )
    useEffect(() => {
        getAllConditions().then(setCondition);
        getToolDetails(id).then(setCurrentTool);
    }, [])

    const saveTool = (e) => {
        e.preventDefault();


        editTool(updateTool).then(navigate(`/usertools`));
    };


    if (currentTool) {
        return (
            <>
                <Card className="m-5 text-center">

                    <h2>Update Tool Info</h2>
                    <Form className="p-5" onSubmit={saveTool}>
                        <FormGroup row>
                            <Label htmlFor="name" >Tool Name</Label>
                            <Col>
                                <Input
                                    value={currentTool.name}
                                    type="text"
                                    name="name"
                                    onChange={(event) => {
                                        const copy = { ...currentTool };
                                        copy.name = event.target.value;
                                        setCurrentTool(copy);
                                    }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="description">Tool Description</Label>
                            <Col>
                                <Input
                                    value={currentTool.description}
                                    type="text"
                                    description="description"
                                    onChange={(event) => {
                                        const copy = { ...currentTool };
                                        copy.description = event.target.value;
                                        setCurrentTool(copy);
                                    }}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="condition">Select A Condition</Label>
                            <Input value={currentTool.conditionId} type="select"
                                onChange={(event) => {
                                    const copy = { ...currentTool };
                                    copy.conditionId = parseInt(event.target.value);
                                    setCurrentTool(copy);
                                }}>
                                {condition ? condition.map((condition) => <option value={condition.id} key={`addtoolcondition--${condition.id}`}>{condition.name}</option>) : ""}
                            </Input>
                        </FormGroup>
                        <Button
                            id="tool-save-button"
                            color="success"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Form>
                </Card>
            </>
        )
    }
}