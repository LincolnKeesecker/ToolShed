import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { addTool } from "../../modules/toolManager";
import { Form, Button, FormGroup, Input, Label } from "reactstrap";

const ToolForm = () => {
    const navigate = useNavigate();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [condition, setCondition] = useState();

    const submitTool = (e) => {
        e.preventDefault();
        const tool = {
            name,
            description,
            condition
        }

        addTool(tool).then((toolData) => { navigate(`/toolDetails/${toolData.id}`) });
    };

    return (
        <>
            <h2>New Tool</h2>
            <Form onSubmit={submitTool}>
                <FormGroup>
                    <Label htmlFor="name">Tool Name</Label>
                    <Input name="name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="description">Tool Description</Label>
                    <Input description="description"
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="condition" className="m-3">Select A Condition</Label>
                    <select onChange={(e) => setCondition(e.target.value)}>
                        {condition.map((condition) => <option value={condition.id} key={`addtoolcondition--${condition.id}`}>{condition.name}</option>)}
                    </select>
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