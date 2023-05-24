import { User } from "./typedefs";

export const filterUsers = (users: User[], query: string) => {
  return users.filter(
    user => user.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const getSortedUsers = (users: User[], sortType: string) => {
  const copy = [...users];

  return copy.sort((a, b) => {
    switch (sortType) {
      case 'alphabet':
        return a.name.localeCompare(b.name);

      case 'age':
        const birthdateA = a.birthdate.getTime();
        const birthdateB = b.birthdate.getTime();
        return birthdateA - birthdateB;
  
      default:
        return 0;
    }
  })
}