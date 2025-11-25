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
    <div className="card card-compact bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden border border-base-300 rounded-2xl">
      
      {/* Image */}
      <Link href={`/products/${_id}`} className="relative">
        <figure className="h-64 bg-base-200 overflow-hidden rounded-t-2xl">
          <img 
            src={image || 'https://via.placeholder.com/400'} 
            alt={name} 
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" 
          />
        </figure>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3 badge badge-primary font-bold shadow-lg">
            {category}
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 btn btn-sm btn-circle bg-base-100/90 backdrop-blur-sm hover:bg-error hover:text-error-content border-base-300">
          <FiHeart size={18} />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 badge badge-primary badge-lg text-primary-content font-bold shadow-lg">
          ${price}
        </div>
      </Link>

      {/* Card Content */}
      <div className="card-body">
        <Link href={`/products/${_id}`}>
          <h3 className="card-title text-base-content line-clamp-1 hover:text-primary transition-colors cursor-pointer font-bold">
            {name}
          </h3>
        </Link>

        <p className="text-sm opacity-70 line-clamp-2 mb-2">{description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={16} className="text-warning fill-warning" />
            ))}
          </div>
          <span className="text-xs opacity-60 ml-2 font-semibold">(4.5)</span>
        </div>

        {/* Stock Status */}
        <div className={`badge ${stockStatus.color} badge-outline mb-3 font-semibold`}>
          {stockStatus.text}
        </div>

        {/* Add to Cart Button */}
        <button
          className="btn btn-primary w-full flex items-center gap-2 font-semibold"
          disabled={stock === 0}
        >
          <FiShoppingCart size={18} />
          {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
