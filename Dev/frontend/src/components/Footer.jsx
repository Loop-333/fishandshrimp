import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contacte-nos</h2>
          <p className="text-sm">
            Fish & Shrimp Azeitão
            <br />
            +351 924 138 294
            <br />
            fishandshrimpazeitao@gmail.com
          </p>
        </div>

        {/* Social Media */}
        <div className="flex sm:justify-center gap-6">
          <a
            href="https://wa.me/351924138294"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:text-green-700 text-2xl"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/fish_and_shrimp_azeitao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-700 text-2xl"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Logo or About */}
        <div className="text-sm sm:text-right">
          <p>&copy; {new Date().getFullYear()} Fish & Shrimp Azeitão</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
