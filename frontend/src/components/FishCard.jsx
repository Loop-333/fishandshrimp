import { useCart } from "../context/useCart";
import { useState } from "react";

export default function FishCard({ fish, onViewDetails }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [hovered, setHovered] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < fish.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (fish.stock > 0) {
      addToCart(fish, quantity);
      setQuantity(1); // Reset if needed
    }
  };

  // Get first PNG image
  const mainImage = fish.imageUrl
    ?.split(";")
    .find((img) => img.trim().endsWith(".png")) || "";

  // Get first GIF image (for hover)
  const gifImage = fish.imageUrl
    ?.split(";")
    .find((img) => img.trim().endsWith(".gif"));

  // Image to show: gif on hover if available, else png
  const displayedImage = hovered && gifImage ? gifImage : mainImage;

  return (
    <div
      className="border rounded-xl shadow-md p-2 w-full max-w-xs bg-white hover:bg-white transition duration-500 hover:scale-110"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={displayedImage}
        alt={fish.name}
        className="w-full h-55 object-cover rounded-md cursor-pointer"
        onClick={() => onViewDetails(fish)}
      />
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold">{fish.name}</h3>
        <p className="text-gray-700">Preço: {fish.price.toFixed(2)}€</p>
        <p className="text-gray-500 text-sm">Stock: {fish.stock}</p>
        <p className="text-gray-500 text-sm">Comprimento: {fish.size}cm</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrease}
            className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            readOnly
            className="w-10 text-center border border-gray-300 rounded"
          />
          <button
            onClick={handleIncrease}
            disabled={quantity >= fish.stock}
            className={`px-2 py-1 rounded ${
              quantity >= fish.stock
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={fish.stock === 0}
          className={`mt-2 px-4 py-2 w-full rounded text-white ${
            fish.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          {fish.stock === 0 ? "Esgotado" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
