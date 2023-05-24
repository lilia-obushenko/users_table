import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { firestore } from "../firebase";
import { User } from "../typedefs";

interface Options {
  users: User[],
  editingUserId: string,
  onUserId: (value: string) => void,
  getUsers: () => Promise<void>,
}

export const useForm = (options: Options) => {
  const {
    users,
    editingUserId,
    onUserId,
    getUsers,
  } = options;
  
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

  return {
    name,
    error,
    surname,
    email,
    phone,
    birthdate,
    editingUserId,
    setName,
    setSurname,
    setEmail,
    setPhone,
    setBirthdate,
    handleSubmit
  };
}