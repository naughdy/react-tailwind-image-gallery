import React, { useEffect, useState } from "react";
import { ImageCard } from "./components/ImageCard";
import { ImageSearch } from "./components/ImageSearch";

export const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [term]);
  return (
    <div className="container content-center">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {loading ? (
        <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gaps-4 place-items-center">
          {images.map((item) => (
            <ImageCard image={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
};
