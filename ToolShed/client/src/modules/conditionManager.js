import { getToken } from "./authManager"

const _apiUrl = "/api/condition"

export const getAllConditions = (usePagination, increment, offset) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}?usePagination=${usePagination}${(increment ? `&increment=${increment}` : "")}${(offset ? `&offset=${offset}` : "")}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => res.json())
    })
}

export const addCondition = (conditionName) => {
    return getToken().then(token => {
        return fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: conditionName })
        })
    })
}

export const deleteCondition = (conditionId) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}/${conditionId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })
}

//! Don't technically need ID here, since categoryName has a unique constraint
export const editCondition = (oldName, conditionName) => {
    return getToken().then(token => {
        return fetch(`${_apiUrl}?oldName=${oldName}&newName=${conditionName}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
    })
}