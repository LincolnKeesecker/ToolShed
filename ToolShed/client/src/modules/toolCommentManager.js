import { getToken } from "./authManager"

const toolCommentsURL = "/api/ToolComment"

export const getToolComments = (id) => {
    return getToken().then((token) => {
        return fetch(`${toolCommentsURL}/tool/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get tool comments."
                )
            }
        })
    })
}

export const AddToolComment = (toolComment) => {
    return getToken().then(token => {
        return fetch(`${toolCommentsURL}/add`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(toolComment)
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An error occured while trying to add a comment.",
                )
            }
        })
    })
}

export const deleteToolComment = (toolCommentId) => {
    return getToken().then(token => {
        return fetch(`${toolCommentsURL}/${toolCommentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}