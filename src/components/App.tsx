import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { SearchInput } from './SearchInput';
import { css } from '@emotion/css';
import { Masonry } from 'masonic';
import { Header } from './Header';

type Image = {
  id: string;
  color: string;
  urls: {
    small: string;
  };
};

type ImageState = {
  isLoading: boolean;
  images: Image[];
};

type MasonryCardProps = {
  data: any;
  width: number;
};

function App() {
  const [data, setData] = useState<ImageState>({ isLoading: false, images: [] });
  const [query, setQuery] = useState<string | null>(null);
  const debouncedText = useDebounce(query);

  useEffect(() => {
    setData((prevState) => ({ ...prevState, isLoading: true }));

    axios
      .get(`/search?page=${1}&query=${debouncedText}`)
      .then((response) => setData({ isLoading: false, images: response.data.results }))
      .catch((error) => alert(error?.response?.data?.message));
  }, [debouncedText]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e?.target?.value);
  };

  return (
    <>
      <Header title="Unsplash Demo">
        <SearchInput onChange={(e) => handleSearchChange(e)} />
      </Header>

      <div className={css({ borderTop: '1px solid #ddd', padding: '1rem' })}>
        {!data.isLoading && data.images.length === 0 && <span>No matches found for "{debouncedText}"</span>}

        {!data.isLoading && (
          <Masonry columnGutter={8} columnWidth={250} overscanBy={5} items={data.images} render={MasonryCard} />
        )}
      </div>
    </>
  );
}

const MasonryCard = ({ data, width }: MasonryCardProps) => (
  <div className={css({ backgroundColor: data.color, width: width, borderRadius: '5px', overflow: 'hidden' })}>
    <img className={css({ display: 'block', maxWidth: '100%' })} src={data.urls.small} />
  </div>
);

export default App;
