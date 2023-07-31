import { getToken } from "./authManager";

const toolsURL = "/api/Tool"

export const getAllTools = () => {
    return getToken().then((token) => {
        return fetch(toolsURL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get your tools."
                );
            }
        });
    });
};

export const getToolDetails = (id) => {
    return getToken().then((token) => {
        return fetch(`${toolsURL}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get tools."
                );
            }
        });
    });
};

export const getUserTools = (id) => {
    return getToken().then((token) => {
        return fetch(`${toolsURL}/MyToolShed/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get a users tools."
                );
            }
        });
    });
};


export const addTool = (tool) => {
    return getToken().then((token) => {
        return fetch(`${toolsURL}/add`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tool),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else if (res.status === 401) {
                throw new Error("Unathorized");
            } else {
                throw new Error(
                    "An error occured while trying to add a post.",
                );
            }
        });
    });
};

export const deleteTool = (toolId) => {
    return getToken().then(token => {
        return fetch(`${toolsURL}/${toolId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}

export const editTool = (tool) => {
    return getToken().then(token => {
        return fetch(`${toolsURL}/${tool.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tool)
        })
    })
}