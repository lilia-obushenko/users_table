import { useEffect, useState } from "react";
import { User } from "../typedefs";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";

export const useApp = () => {
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

  return {
    users,
    handleEditUser,
    setEditingUserId,
    editingUserId,
    getUsers,
  };
};