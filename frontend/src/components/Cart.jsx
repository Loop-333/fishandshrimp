import { useCart } from '../context/useCart';
import { FaWhatsapp } from 'react-icons/fa';

export default function Cart({ onClose }) {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Build the message text for WhatsApp
  const buildWhatsAppMessage = () => {
    if (cartItems.length === 0) return 'Carrinho vazio.';

    let message = 'Olá, gostaria de fazer o pedido:\n\n';

    cartItems.forEach((item) => {
      message += `${item.name} - Quantidade: ${item.quantity};\n`;
    });

    message += `\nObrigado!`;

    return encodeURIComponent(message);
  };

  // WhatsApp phone number (with country code, no plus or spaces)
  const whatsappNumber = '351924138294';

  // WhatsApp URL with pre-filled text
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${buildWhatsAppMessage()}`;

  // Open WhatsApp in new tab
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('O carrinho está vazio.');
      return;
    }
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-opacity-30 z-50 flex justify-end">
      <div className="w-full sm:w-96 bg-white h-full shadow-lg flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Carrinho</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-2xl">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">O carrinho está vazio.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border p-2 rounded">
                <img
                  src={item.imageUrl.split(';').find((img) => img.endsWith('.png'))}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × {item.price.toFixed(2)} €
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remover
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>{total.toFixed(2)} €</span>
          </div>
          <button
            className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition flex items-center gap-3 px-4"
            onClick={handleCheckout}
          >
            <FaWhatsapp className="text-2xl" />
            Finalizar Pedido via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
