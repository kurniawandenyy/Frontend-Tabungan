import axios from 'axios'

export const addTabungan = (url, data) => ({
    type: "ADD_TABUNGAN",
    payload: axios.post(url, data)
})

export const getTabungan = url => ({
    type: "GET_TABUNGAN",
    payload: axios.get(url)
})

export const deleteTabungan = (url) => ({
    type: "DELETE_TABUNGAN",
    payload: axios.delete(url)
})

export const updateTabungan = (url, data) => ({
    type: "UPDATE_TABUNGAN",
    payload: axios.put(url, data)
})