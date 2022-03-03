import { deleteContact } from "../services/phonebook";

const PhoneBook = ({ persons, setPersons, setBackup, setIndicator, setClassname }) => {
  return (
    <table>
      <tbody>
        {persons &&
          persons.map((person) => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button
                  onClick={() => {
                    if (window.confirm(`delete ${person.name}?`)) {
                      deleteContact(
                        `http://localhost:3001/persons/${person.id}`
                      ).then((res) => {
                        const newPeople = persons.filter(
                          (singlePerson) => singlePerson.id !== person.id
                        );
                        setPersons(newPeople);
                        setBackup(newPeople);
                        setIndicator("User deleted successfully");
                        setClassname("success");
                        setTimeout(() => setIndicator(""), 3000)
                      });
                    }
                  }}
                >
                  Delete
                </button>{" "}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default PhoneBook;
