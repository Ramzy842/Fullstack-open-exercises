import { useEffect, useState } from "react";
import Form from "./components/Form";
import PhoneBook from "./components/PhoneBook";
import Search from "./components/Search";
import axios from "axios";
import { createContact, updateUser } from "./services/phonebook";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState();
  const [backup, setBackup] = useState();
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [indicator, setIndicator] = useState("");
  const [classname, setClassname] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    const targetUser = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (targetUser) {
      if (
        window.confirm(
          `${targetUser.name} is already added to phonebook replace the old number with a new one?`
        )
      ) {
        updateUser(`http://localhost:3001/persons/${targetUser.id}`, {
          ...targetUser,
          number,
        })
          .then((response) => {
            let newUsers = persons.map((user) =>
              user.name.toLowerCase() === targetUser.name.toLowerCase()
                ? { ...targetUser, number }
                : user
            );
            setPersons(newUsers);
            setBackup(newUsers);
            setIndicator(`${targetUser.name}'s number is updated successfully`);
            setTimeout(() => setIndicator(""), 3000);
            setClassname("success");
            setNewName("");
            setNumber("");
            // solution number 2 (works but pushes modified item to the end of the array)
            // let newUsers = persons.filter(user => user.name !== targetUser.name)
            // setPersons([...newUsers, { ...response.data }]);
            // setBackup([...newUsers, { ...response.data }]);
          })
          .catch((err) => {
            setIndicator(
              `Information of ${targetUser.name} has already been removed from the server`
            );
            setClassname("error");
            setTimeout(() => setIndicator('') , 3000)
          });
      }
      return;
    }

    createContact(newName, number).then((response) => {
      setPersons([...persons, response.data]);
      setBackup([...persons, response.data]);
    });
    setIndicator("User created successfully");
    setClassname("success");
    setTimeout(() => setIndicator(""), 3000);

    setNewName("");
    setNumber("");
  };

  const handleNameChange = (e) => {
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

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setBackup(response.data);
    });
  }, []);

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
      {indicator && <p className={classname}>{indicator}</p>}
      <Search searchValue={searchValue} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <Form {...formProps} />
      <h2>Numbers</h2>
      <PhoneBook
        setIndicator={setIndicator}
        setClassname={setClassname}
        setPersons={setPersons}
        setBackup={setBackup}
        persons={persons}
      />
    </div>
  );
};

export default App;
