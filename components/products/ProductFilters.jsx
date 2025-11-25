import { FiFilter, FiSearch, FiX } from 'react-icons/fi';

export default function ProductFilters({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory,
  categories 
}) {
  return (
    <div className="sticky top-16 z-40 bg-base-100 border-b border-base-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-base-200 border-2 border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-base-200 rounded-full transition-colors"
              >
                <FiX className="text-base-content/70" />
              </button>
            )}
          </div>

          <div className="relative sm:w-64">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-base-200 border-2 border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer transition-all appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
