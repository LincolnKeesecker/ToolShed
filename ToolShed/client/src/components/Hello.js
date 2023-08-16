import React from "react";
import { Card } from "reactstrap";
import logo from '../images/logo.png'

export default function Hello() {
    return (
        <>
            <Card>
                <img src={logo} style={{
                    position: "fixed",
                    left: 0,
                    right: 0,
                    top: "37%",
                    left: "25%",
                    marginTop: "-0.25rem",
                    width: 100,
                    height: 100
                }}
                />
                <h1
                    style={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        top: "40%",
                        left: "15%",
                        marginTop: "-0.25rem",
                        textAlign: "center",
                    }}>
                    Welcome to ToolShed</h1>
                <h3
                    className="m-5 p-5"
                    style={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        top: "40%",
                        marginTop: "-0.25rem",
                        textAlign: "center",
                    }}>ToolShed is a hub for your local D.I.Y.er to register a catalogue of tools.
                    Users can view their ToolShed as well as other users' ToolSheds and
                    may also leave comments/reviews/requests to borrow tools.</h3>
            </Card >
        </>
    );
}