import ProductCard from '@/components/products/ProductCard';
import { FiSearch } from 'react-icons/fi';

export default function ProductsGrid({ 
  loading, 
  filteredProducts, 
  onResetFilters 
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-base-200 rounded-xl overflow-hidden border-2 border-base-300 animate-pulse">
            <div className="h-64 bg-base-300" />
            <div className="p-5 space-y-3">
              <div className="h-6 bg-base-300 rounded" />
              <div className="h-4 bg-base-300 rounded w-3/4" />
              <div className="h-4 bg-base-300 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-block p-6 bg-base-200 rounded-full mb-6">
          <FiSearch size={64} className="text-base-content/50" />
        </div>
        <h3 className="text-2xl font-bold mb-2">No products found</h3>
        <p className="opacity-70 mb-6">
          Try adjusting your search or filter criteria
        </p>
        <button
          onClick={onResetFilters}
          className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard 
          key={product._id} 
          product={{
            ...product,
            name: product.title || product.name,
            description: product.shortDescription || product.description,
            image: product.imageUrl || product.image,
          }} 
        />
      ))}
    </div>
  );
}
