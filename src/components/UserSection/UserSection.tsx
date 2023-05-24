import { FC, useState } from "react";
import { User } from "../../typedefs";
import { UserFilter } from "../UserFilter/UserFilter";
import { UsersTable } from "../UsersTable/UsersTable";
import { filterUsers, getSortedUsers } from "../../helpers";
import { Paginator } from "../Paginator/Paginator";

interface Props {
  users: User[],
  handleEditUser: (id: string) => void
}

export const UserSection: FC<Props> = ({ handleEditUser, users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState('');

  const visibleUsers = filterUsers(users, query);
  const sortedUsers = getSortedUsers(visibleUsers, sortType);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  return (
    <div className="main__section">
      <UserFilter 
        query={query} onQueryChange={setQuery} 
        onSortChange={setSortType} 
      />

      <UsersTable 
        users={currentItems} 
        onEdit={handleEditUser} 
      />

      <Paginator 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};