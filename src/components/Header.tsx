import { css } from '@emotion/css';
import { ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
  title: string;
};

export const Header = ({ children, title }: HeaderProps) => {
  return (
    <div className={getHeaderStyle()}>
      {title && <h1 className={getTitleStyle()}>{title}</h1>}
      {children}
    </div>
  );
};

const getHeaderStyle = () => {
  return css({
    display: 'flex',
    padding: '1rem',
    gap: '1rem',
    alignItems: 'center',
  });
};

const getTitleStyle = () => {
  return css({
    fontSize: '1rem',
    flexShrink: 0,
  });
};
