export default function StatsCard({ icon: Icon, title, description }) {
  return (
    <div className="card bg-base-100 shadow-sm p-6">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="text-primary text-3xl">
            <Icon />
          </div>
        )}
        <div>
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm opacity-80">{description}</p>
        </div>
      </div>
    </div>
  );
}
