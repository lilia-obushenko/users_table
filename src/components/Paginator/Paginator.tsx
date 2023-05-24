import { Pagination } from "react-bootstrap";
import { FC } from "react";

interface Props {
  currentPage: number,
  totalPages: number,
  onPageChange: (value: number) => void,
}

export const Paginator: FC<Props> = (props) => {
  const {
    currentPage,
    totalPages,
    onPageChange,
  } = props;

  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {Array.from({ length: totalPages }, (_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}

      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};
