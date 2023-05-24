import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { FC, FormEvent, useEffect, useState } from 'react';
import { collection, updateDoc, doc, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';
import { User } from '../../typedefs';

interface Props {
  users: User[],
  editingUserId: string,
  onUserId: (value: string) => void,
  getUsers: () => Promise<void>,
}

export const UserForm: FC<Props> = (props) => {
  const { editingUserId, users, getUsers, onUserId } = props;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthdate, setBirthdate] = useState(new Date());
  const [error, setError] = useState(false);

  const usersRef = collection(firestore, 'users');

  useEffect(() => {
    if (editingUserId) {
      const userToEdit = users.find((user) => user.id === editingUserId);
  
      if (userToEdit) {
        setName(userToEdit.name);
        setSurname(userToEdit.surname);
        setEmail(userToEdit.email);
        setPhone(userToEdit.phone);
        setBirthdate(userToEdit.birthdate);
      }
    }
  }, [editingUserId, users])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      surname,
      email,
      phone,
      birthdate,
    };

    const hasEmptyField = Object.values(data).some((value) => value === '');

    if (hasEmptyField) {
      setError(true);

      return;
    }

    if (editingUserId) {
      await updateDoc(doc(usersRef, editingUserId), data);
      onUserId('');
      getUsers();
    } else {
      await addDoc(usersRef, data);
      getUsers();
    }

    setName('');
    setSurname('');
    setEmail('');
    setPhone('');
    setBirthdate(new Date());
    setError(false);
  };
  
  return (
    <Form style={{ maxWidth: '300px' }} onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          value={surname}
          type="text"
          placeholder="Surname"
          onChange={(e) => setSurname(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <PhoneInput
          value={phone}
          country={'ua'}
          placeholder="+380 (XX) XXX-XX-XX"
          onChange={(e) => setPhone(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
        <DatePicker
          selected={birthdate}
          className="custom-datepicker"
          dateFormat="dd/MM/yyyy"
          placeholderText="Select Date of Birth"
          onChange={(date) => date && setBirthdate(date)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {editingUserId ? 'Save' : 'Add user'}
      </Button>

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          Please enter all data
        </p>
      )}
    </Form>

  );
};
