import { css } from "@emotion/css";
import { ChangeEvent } from "react";

type SearchInputProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
};

export const SearchInput = ({ onChange }: SearchInputProps) => {
  return (
    <input
      className={getSearchInputStyle()}
      type="text"
      name="search"
      onChange={onChange}
      placeholder="Start searching..."
    />
  );
};

const getSearchInputStyle = () => {
  return css({
    backgroundColor: '#ddd',
    border: '0',
    borderRadius: '10rem',
    fontSize: '1rem',
    padding: '0.75rem 1rem',
    width: '100%',
    '&:focus': {
      outline: '3px solid rgba(60, 154, 232, 0.2)',
    },
  });
}