import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { addTool } from "../../modules/toolManager";
import { Form, Button, FormGroup, Input, Label, Col, Card } from "reactstrap";
import { getAllConditions } from "../../modules/conditionManager";

const ToolForm = ({ user }) => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [conditionId, setConditionId] = useState();
    const [condition, setCondition] = useState();

    useEffect(() => {
        getAllConditions().then(setCondition)
    }, [])

    const submitTool = (e) => {
        e.preventDefault();
        const tool = {
            name,
            description,
            conditionId,
            userId: user.id
        }

        addTool(tool).then((tool) => { navigate(`/toolList`) });
    };

    return (
        <>
            <Card className="m-5 bg-secondary bg-opacity-50 text-center">
                <h2 className="m-2">New Tool</h2>
                <Form className="p-3" onSubmit={submitTool}>
                    <FormGroup row>
                        <Label htmlFor="name">Tool Name</Label>
                        <Col>
                            <Input
                                type="text"
                                placeholder="Enter tool name here"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label htmlFor="description">Tool Description</Label>
                        <Col>
                            <Input
                                type="text"
                                placeholder="Enter Tool Description here"
                                description="description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor="condition">Select A Condition</Label>
                        <Input type="select" onChange={(e) => setConditionId(e.target.value)}>
                            {condition ? condition.map((condition) => <option value={condition.id} key={`addtoolcondition--${condition.id}`}>{condition.name}</option>) : ""}
                        </Input>
                    </FormGroup>
                    <Button
                        id="tool-save-button"
                        color="success"
                        type="submit">
                        Save
                    </Button>
                </Form>
            </Card>
        </>
    )
}

export default ToolForm