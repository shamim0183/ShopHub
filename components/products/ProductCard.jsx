import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';

export default function ProductCard({ product }) {
  const { _id, name, description, price, image, category, stock = 100 } = product;

  const getStockStatus = () => {
    if (stock === 0) return { text: 'Out of Stock', color: 'badge-error' };
    if (stock < 10) return { text: 'Low Stock', color: 'badge-warning' };
    return { text: 'In Stock', color: 'badge-success' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="card card-compact bg-base-100 shadow hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden">
      
      {/* Image */}
      <Link href={`/products/${_id}`} className="relative">
        <figure className="h-64 bg-base-200">
          <img src={image || 'https://via.placeholder.com/400'} alt={name} className="w-full h-full object-cover" />
        </figure>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-2 left-2 badge badge-secondary font-bold">{category}</div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 btn btn-sm btn-circle btn-ghost hover:bg-gradient-to-r hover:from-primary hover:to-secondary text-base-content">
          <FiHeart size={18} />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-2 right-2 badge badge-primary text-white font-bold">
          ${price}
        </div>
      </Link>

      {/* Card Content */}
      <div className="card-body">
        <Link href={`/products/${_id}`}>
          <h3 className="card-title line-clamp-1 hover:text-primary transition-colors">{name}</h3>
        </Link>

        <p className="text-sm opacity-80 line-clamp-2">{description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={16} className="text-yellow-400" />
          ))}
          <span className="text-xs text-gray-500 ml-2">(4.5)</span>
        </div>

        {/* Stock Status */}
        <div className={`badge ${stockStatus.color} badge-outline mb-2`}>
          {stockStatus.text}
        </div>

        {/* Add to Cart Button */}
        <button
          className="btn btn-primary w-full flex items-center gap-2"
          disabled={stock === 0}
        >
          <FiShoppingCart size={18} />
          {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
