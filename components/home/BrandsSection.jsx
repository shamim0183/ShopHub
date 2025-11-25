import Marquee from 'react-fast-marquee';

export default function BrandsSection({ brands }) {
  return (
    <section className="py-12 bg-base-100 border-t border-b border-base-300">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-semibold text-xl mb-8 opacity-80">
          Trusted By Leading Brands
        </h2>
        <Marquee gradient={false} speed={40}>
          {brands.map((brand, index) => (
            <div
              key={index}
              className="mx-8 px-8 py-6 bg-base-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              style={{ minWidth: '150px', height: '80px' }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
                style={{ filter: 'brightness(0.8)' }}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
