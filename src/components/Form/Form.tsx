import { FC } from 'react';
import './Form.scss';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { User } from '../../typedefs';
import { useForm } from '../../hooks/useForm';

interface Props {
  users: User[],
  editingUserId: string,
  onUserId: (value: string) => void,
  getUsers: () => Promise<void>,
}

export const UserForm: FC<Props> = (props) => {
  const { 
    editingUserId, 
    users, 
    getUsers, 
    onUserId,
  } = props;

  const {
    error,
    name,
    surname,
    email,
    phone,
    birthdate,
    setName,
    setSurname,
    setEmail,
    setPhone,
    setBirthdate,
    handleSubmit,
  } = useForm({ users, editingUserId, getUsers, onUserId })
  
  return (
    <Form onSubmit={handleSubmit}>
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
        <p className="form__error">
          Please enter all data
        </p>
      )}
    </Form>
  );
};
