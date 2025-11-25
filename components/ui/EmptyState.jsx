export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-xl border border-base-300">
      {Icon && (
        <div className="text-6xl mb-4 opacity-50">
          <Icon />
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      {description && <p className="opacity-70 mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
