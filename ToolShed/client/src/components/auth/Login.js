import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../modules/authManager";


export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => navigate("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Card className="m-5 bg-secondary bg-opacity-50 text-center">
            <Form className="p-5" onSubmit={loginSubmit}>
                <h1 className="m-5">ToolShed</h1>
                <fieldset>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            autoFocus
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
                        <Button>Login</Button>
                    </FormGroup>
                    <em>
                        Not registered? <Link to="/register">Register</Link>
                    </em>
                </fieldset>
            </Form>
        </Card>
    );
}