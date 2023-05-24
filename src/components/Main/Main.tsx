import { useApp } from "../../hooks/useApp";
import { UserForm } from "../Form/Form"
import { UserSection } from "../UserSection/UserSection"

export const Main = () => {
  const {
    users,
    getUsers,
    editingUserId,
    handleEditUser,
  } = useApp();
  
  return (
    <div className="App__forms">
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
  );
};