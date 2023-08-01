import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../../modules/authManager";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords do not match. Please try again.")
        } else {
            const user = {
                name,
                email,
            };
            register(user, password).then(() => navigate("/"));
        }
    };

    return (
        <Card className="m-5 bg-secondary bg-opacity-50 text-center">
            <Form className="p-5" onSubmit={registerClick}>
                <h1 className="m-5">ToolShed Registration</h1>
                <fieldset>
                    <FormGroup>
                        <Label htmlFor="Name">Name</Label>
                        <Input
                            id="Name"
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button>Register</Button>
                    </FormGroup>
                </fieldset>
            </Form>
        </Card>
    );
}