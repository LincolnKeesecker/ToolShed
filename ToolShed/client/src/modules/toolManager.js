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

export const getUserTools = (userId) => {
    return getToken().then((token) => {
        return fetch(`${toolsURL}/MyToolShed/${userId}`, {
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
                    "Dagnabit! You can't add that!"
                );
            }
        });
    });
};