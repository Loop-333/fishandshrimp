import { useEffect, useState } from 'react';
import FishCard from './FishCard'; // adjust path if needed

export default function FishDisplay() {
  const [fishList, setFishList] = useState([]);
  const [selectedFish, setSelectedFish] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/api/fish')
      .then((res) => res.json())
      .then((data) => setFishList(data))
      .catch((err) => console.error('Error fetching fish:', err));
  }, []);

  function ImageGallery({ imageUrl, name }) {
    const pngImages = (imageUrl || '')
      .split(';')
      .map((url) => url.trim())
      .filter((url) => url.endsWith('.png'));

    const [index, setIndex] = useState(0);

    const nextImage = () => {
      setIndex((prev) => (prev + 1) % pngImages.length);
    };

    const prevImage = () => {
      setIndex((prev) => (prev - 1 + pngImages.length) % pngImages.length);
    };

    if (pngImages.length === 0) return null;

    return (
      <div className="relative mb-4">
        <img
          src={pngImages[index]}
          alt={`${name} image ${index + 1}`}
          className="w-full h-80 object-cover rounded-md"
        />
        {pngImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black shadow-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
            >
              &#8249;
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black shadow-lg rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
            >
              &#8250;
            </button>
          </>
        )}
      </div>
    );
  }

  // Sort fishList based on selectedFilter for rendering
  let displayedFishList = [...fishList];
  if (selectedFilter === 'Alphabet') {
    displayedFishList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (selectedFilter === 'Stock') {
    displayedFishList.sort((a, b) => b.stock - a.stock);
  }

  return (
    <div>
      <div className="mt-5 mb-0 flex justify-center">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border rounded px-6 py-2"
        >
          <option>Filtar por...</option>
          <option value="Alphabet">Ordem Alfabética</option>
          <option value="Stock">Maior Stock</option>
        </select>
      </div>
      <div className="p-6 flex flex-wrap gap-6 justify-center">
        {/* Render each fish card */}
        {displayedFishList.map((fish) => (
          <FishCard key={fish.id} fish={fish} onViewDetails={setSelectedFish} />
        ))}

        {/* STEP 3 — the modal goes right here */}
        {selectedFish && (
          <div className="fixed inset-0 bg-opacity-10 flex items-center justify-center z-50">
            <div className="border bg-white max-w-2xl w-full p-6 rounded-xl relative">
              <button
                onClick={() => setSelectedFish(null)}
                className="absolute top-2 right-2 text-xl text-gray-500 hover:text-red-600"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-4">{selectedFish.name}</h2>

              {/* IMAGE GALLERY LOGIC */}
              <ImageGallery imageUrl={selectedFish.imageUrl} name={selectedFish.name} />

              <p className="mb-2 text-gray-700">{selectedFish.description}</p>
              <p className="mb-2 text-sm text-gray-500">Categoria: {selectedFish.category}</p>
              <p className="mb-2">Preço: {selectedFish.price} €</p>
              <p className="mb-2">Comprimento: {selectedFish.size} cm</p>
              <p className="mb-4">Stock: {selectedFish.stock}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
