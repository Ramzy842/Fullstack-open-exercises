import axios from "axios";

const createContact = (newName, number) => {
  return axios.post("/api/persons", {
    name: newName,
    number,
  })
};

const deleteContact = (contact) => {
    return axios.delete(contact)
}

const updateUser = (url, contact) => {
    return axios.put(url, contact)
}

export {createContact, deleteContact, updateUser};