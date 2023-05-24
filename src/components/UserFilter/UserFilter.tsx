import { FC } from "react";
import { Form } from "react-bootstrap";

interface Props {
  query: string,
  onQueryChange: (text: string) => void,
  onSortChange: (sort: string) => void,
}

export const UserFilter: FC<Props> = (props) => {
  const {
    query,
    onQueryChange,
    onSortChange,
  } = props;

  return (
    <div className="filter__container">
      <Form style={{ maxWidth: '300px' }}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Filter by Name"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Form style={{ maxWidth: '300px' }}>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">Sort users by..</option>

          <option value="age">Age</option>

          <option value="alphabet">Alphabetically</option>
        </Form.Select>
      </Form>
    </div>
  );
};
