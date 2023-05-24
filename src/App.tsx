import './App.css';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { User } from './typedefs';
import { firestore } from './firebase';
import { UserSection } from './components/UserSection/UserSection';
import { UserForm } from './components/Form/Form';

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState('');

  const usersRef = collection(firestore, 'users');

  const getUsers = async () => {
    const querySnapshot = await getDocs(usersRef);

    const userList: User[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      const user: User = {
        id: doc.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        birthdate: data.birthdate.toDate(),
      };
      
      return user;
    });

    setUsers(userList);
  };

  const handleEditUser = (userId: string) => {
    setEditingUserId(userId);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <div className="forms">
        <UserForm 
          users={users} 
          editingUserId={editingUserId} 
          onUserId={handleEditUser} 
          getUsers={getUsers} 
        />

        <UserSection 
          handleEditUser={handleEditUser} 
          users={users} 
        />
      </div>
    </div>
  );
};

