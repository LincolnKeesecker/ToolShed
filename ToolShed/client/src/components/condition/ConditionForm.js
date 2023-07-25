import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Form, FormGroup, FormText, Input, Label } from "reactstrap"
import { addCondition, editCondition } from "../../modules/conditionManager"

const ConditionForm = () => {
    const { conditionName } = useParams(),
        [name, setName] = useState(conditionName ?? ""),
        navigate = useNavigate()


    useEffect(() => {
        document.getElementById("condition-save-btn").disabled = true
    }, [])

    const changeState = (e) => {
        if (e.target.value.trim() === "" || e.target.value === null) {
            // Disable the save button if input is empty
            document.getElementById("condition-save-btn").disabled = true
        } else {
            document.getElementById("condition-save-btn").disabled = e.target.value === conditionName
        }
        setName(e.target.value)
    }

    const createCondition = (e) => {
        e.preventDefault()

        if (conditionName) {
            editCondition(conditionName, name)
                .then(res => {
                    if (res.ok) {
                        navigate("/conditions")
                    } else {
                        const nameErr = document.getElementById("condition-name-validation")
                        const saveBtn = document.getElementById("condition-save-btn")

                        nameErr.style.display = "block"
                        saveBtn.disabled = true

                        setTimeout(() => {
                            nameErr.style.display = "none"
                            saveBtn.disabled = false
                        }, 3000)
                    }
                })
        } else {
            addCondition(name)
                .then(res => {
                    if (res.ok) {
                        navigate("/conditions")
                    } else {
                        const nameErr = document.getElementById("condition-name-validation")
                        const saveBtn = document.getElementById("condition-save-btn")

                        nameErr.style.display = "block"
                        saveBtn.disabled = true

                        setTimeout(() => {
                            nameErr.style.display = "none"
                            saveBtn.disabled = false
                        }, 3000)
                    }
                })
        }
    }

    return (
        <Form onSubmit={createCondition}>
            <h2>{!conditionName ? 'Create' : 'Edit'} Condition</h2>
            <hr className="clear" />
            <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input name="name" className="w-auto" value={name} onChange={changeState} />
                <FormText className="hidden" id="condition-name-validation" color="danger">An error occured.</FormText>
            </FormGroup>
            <Button id="condition-save-btn" color="success">Save {conditionName && 'Changes'}</Button>
        </Form>
    )
}

export default ConditionForm