import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { addTool } from "../../modules/toolManager";
import { Form, Button, FormGroup, Input, Label, Col } from "reactstrap";
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
            <h2>New Tool</h2>
            <Form onSubmit={submitTool}>
                <FormGroup row>
                    <Label sm={2} htmlFor="name">Tool Name</Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2} htmlFor="description">Tool Description</Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            description="description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Label sm={2} htmlFor="condition" className="m-3">Select A Condition</Label>
                    <Input sm={10} type="select" onChange={(e) => setConditionId(e.target.value)}>
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
        </>
    )
}

export default ToolForm