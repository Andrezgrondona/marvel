import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GoogleLogin from './components/Auth/GoogleLogin';
import ComicList from './components/Comics/ComicList'; 
import { db } from './services/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore'; 

const App: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]); 

  const addFavorite = async (comic: any) => {
    if (!favorites.find(fav => fav.id === comic.id)) { 
      setFavorites([...favorites, comic]);

      // Guardar en Firestore
      try {
        await addDoc(collection(db, "favorites"), {
          id: comic.id,
          title: comic.title,
          thumbnail: comic.thumbnail,
        });
        console.log(`${comic.title} ha sido añadido a Firestore`);
      } catch (error) {
        console.error("Error al añadir favorito a Firestore:", error);
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<GoogleLogin />} />
        <Route path="/comics" element={<ComicList onAddFavorite={addFavorite} comics={[]} />} />
      </Routes>
    </Router>
  );
};

export default App;