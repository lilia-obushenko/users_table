import { Button, Table } from "react-bootstrap";
import { User } from "../../typedefs";
import { FC } from "react";

interface Props {
  users: User[],
  onEdit: (id: string) => void,
}

export const UsersTable: FC<Props> = (props) => {
  const {
    users,
    onEdit,
  } = props;

  return (
    <Table striped bordered hover className="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Phone number</th>
          <th>Birth date</th>
          <th>Editing</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr style={{ height: '10px' }}>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.birthdate.toLocaleDateString()}</td>
            <td>
              <Button
                variant="primary"
                onClick={() => onEdit(user.id)}
              >
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
