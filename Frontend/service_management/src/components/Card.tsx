export const Card = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">sweet</h3>
      <p className="text-gray-600 mb-4">Orden</p>
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 rounded-full text-sm font-semibold "></span>
        <button className="text-indigo-600 hover:text-indigo-800 font-medium">
          Ver Detalles
        </button>
      </div>
    </div>
  );
};
