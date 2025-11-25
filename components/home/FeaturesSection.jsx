export default function FeaturesSection({ features }) {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-bold mb-8">Why Shop With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="card bg-base-100 shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="text-primary text-3xl">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-sm opacity-80">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
