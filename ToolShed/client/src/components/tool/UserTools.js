import { useState, useEffect } from "react";
import { getUserTools } from "../../modules/toolManager";
import { Link } from "react-router-dom";
import Tool from "./Tool";

export default function UserTools({ user }) {
    const [tools, setTools] = useState([]);
    const userCheck = user

    useEffect(() => {
        getUserTools(user.id).then(setTools);
    }, [user]);

    if (tools.length > 0) {
        return (
            <section>
                {tools.map((t) => (
                    <Tool key={t.id} tool={t} userCheck={userCheck} />
                ))}
            </section>
        )
    } else {
        return (
            <>
                <p>Your ToolShed is empty</p>
                <p>Click <Link to="/addTool">here</Link> to add your first tool!</p>
            </>
        )
    }
}