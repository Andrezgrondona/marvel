import React, { useEffect, useState } from 'react';
import { getComics } from '../services/marvelApi';
import ComicList from '../components/Comics/ComicList';

const Home: React.FC = () => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      const data = await getComics();
      setComics(data);
    };
    fetchComics();
  }, []);

  return (
    <div>
      <h1>Lista de Cómics</h1>
      <ComicList comics={comics} />
    </div>
  );
};

export default Home;