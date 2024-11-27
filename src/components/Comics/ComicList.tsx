import React, { useEffect, useState } from "react";
import { getComics } from "../../services/marvelApi";
import { db } from "../../services/firebaseConfig"; // Importa Firestore
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Comic {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

interface ComicListProps {
  onAddFavorite: (comic: Comic) => void;
}

const ComicList: React.FC<ComicListProps> = ({ onAddFavorite }) => {
  const [comics, setComics] = useState<Comic[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Comic[]>([]);
  const auth = getAuth(); // Obtén la instancia de autenticación

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const data = await getComics();
        setComics(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchComics();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (auth.currentUser) {
        const favoriteCollection = collection(
          db,
          "users",
          auth.currentUser.uid,
          "favorites"
        );
        const favoriteDocs = await getDocs(favoriteCollection);

        const favoritesData = favoriteDocs.docs.map((doc) => ({
          id: doc.data().id,
          ...doc.data(),
        }));
        setFavorites(favoritesData as any);
      }
    };

    fetchFavorites();
  }, [auth]);

  if (error) return <div>Error: {error}</div>;

  const handleAddFavorite = async (comic: Comic) => {
    if (!favorites.some((fav) => fav.id === comic.id)) {
      onAddFavorite(comic);

      if (auth.currentUser) {
        try {
          await addDoc(
            collection(db, "users", auth.currentUser.uid, "favorites"),
            {
              id: comic.id,
              title: comic.title,
              thumbnail: comic.thumbnail,
            }
          );
          setFavorites((prevFavorites) => [...prevFavorites, comic]);
        } catch (error) {
          console.error("Error al añadir favorito a Firestore:", error);
        }
      } else {
        console.error("No hay usuario autenticado");
      }
    }
  };

  const handleRemoveFavorite = async (comicId: number) => {
    if (auth.currentUser) {
      try {
        const favoriteCollection = collection(
          db,
          "users",
          auth.currentUser.uid,
          "favorites"
        );

        const favoriteDocs = await getDocs(favoriteCollection);

        const comicDoc = favoriteDocs.docs.find(
          (doc) => doc.data().id === comicId
        );

        if (comicDoc) {
          await deleteDoc(doc(favoriteCollection, comicDoc.id));

          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.id !== comicId)
          );
        } else {
          console.error(
            "No se encontró comic para eliminar"
          );
        }
      } catch (error) {
        console.error("Error al eliminar comic  favorito", error);
      }
    } else {
      console.error("No hay usuario autenticado");
    }
  };

  return (
    <>
      <div className="Title-list">Comic List</div>
      <div className="comic-list">
        {comics.map((comic) => (
          <>
            <div className="card" key={comic.id}>
              <h2 style={{ color: "black" }}>{comic.title}</h2>
              <h2  style={{ color: "black" }}>ID: {comic.id} </h2>
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <button onClick={() => handleAddFavorite(comic)}>
                Add to Favorites
              </button>
              {favorites.some((fav) => fav.id === comic.id) && (
                <>
                  <button onClick={() => handleRemoveFavorite(comic.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default ComicList;
