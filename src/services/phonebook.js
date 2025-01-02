import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  const req = axios.get(baseUrl);
  return req.then((response) => response.data);
};

const createPerson = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then((response) => response.data);
};

const updatePerson = (id, updatedEntry) => {
  const req = axios.put(`${baseUrl}/${id}`, updatedEntry);
  return req.then((response) => response.data);
};

const deletePerson = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`);
    return req.then((response) => response.data);
  };
  

export default { getAllPersons, createPerson, updatePerson, deletePerson };
