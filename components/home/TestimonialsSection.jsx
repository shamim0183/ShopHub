import Marquee from 'react-fast-marquee';
import { FiStar } from 'react-icons/fi';

export default function TestimonialsSection({ testimonials }) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-8">Customer Reviews</h2>
        <Marquee gradient={true} speed={40} pauseOnHover={true}>
          {testimonials.map((t, idx) => (
            <div key={idx} className="mx-4 w-80">
              <div className="card bg-base-100 shadow p-6">
                <div className="mb-3 flex gap-1 text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <FiStar key={i} />
                  ))}
                </div>
                <p className="italic mb-4">"{t.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm opacity-70">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
