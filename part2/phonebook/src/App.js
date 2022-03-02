import { useState } from "react";
import Form from "./components/Form";
import PhoneBook from "./components/PhoneBook";
import Search from "./components/Search";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [backup, setBackup] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setPersons([...persons, { name: newName, number, id: new Date() }]);
    setBackup([...persons, { name: newName, number, id: new Date() }]);
    setNewName("");
    setNumber("");
  };

  const handleNameChange = (e) => {
    const targetPerson = persons.find(
      (person) => person.name === e.target.value
    );

    if (targetPerson) {
      alert(`${targetPerson.name} is already added to the phonebook`);
      return;
    }
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    let targetSearch = backup.filter((person) =>
      person.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    if (!searchValue) {
      setPersons(backup);
      return;
    }
    setPersons(targetSearch);
  };

  const formProps = {
    handleClick,
    newName,
    number,
    handleNameChange,
    handleNumberChange,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search searchValue={searchValue} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <Form {...formProps} />
      <h2>Numbers</h2>
      <PhoneBook persons={persons} />
    </div>
  );
};

export default App;
