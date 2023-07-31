import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button, Card, FormGroup, Input, Label } from "reactstrap";
import { editUser } from "../../modules/authManager";

export const UserEdit = ({ user }) => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState();


    useEffect(
        () => {
            setCurrentUser(user)
        },
        [user]
    )

    const saveUser = (e) => {
        e.preventDefault();

        editUser(currentUser).then(navigate(`/myaccount`));
    };

    if (currentUser) {
        return <>
            <Card className="m-5 text-center" style={{
            }}>
                <Form className="p-3" onSubmit={saveUser}>
                    <h3>Update Current Account Info</h3>
                    <FormGroup>
                        <Label htmlFor="fullName">Name: </Label>
                        <Input
                            required
                            type="input"
                            value={currentUser.name}
                            placeholder={currentUser?.name}
                            onChange={
                                (evt) => {
                                    const copy = { ...currentUser }
                                    copy.name = evt.target.value
                                    setCurrentUser(copy)
                                }
                            } />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email: </Label>
                        <Input
                            required
                            type="input"
                            value={currentUser.email}
                            placeholder={currentUser?.email}
                            onChange={
                                (evt) => {
                                    const copy = { ...currentUser }
                                    copy.email = evt.target.value
                                    setCurrentUser(copy)
                                }
                            } />
                    </FormGroup>
                    <Button
                        id="user-save-button"
                        color="success"
                        type="submit">
                        Save Updated Info
                    </Button>
                </ Form>
            </Card>
        </>
    }
}