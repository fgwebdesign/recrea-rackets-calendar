interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-4 rounded-lg bg-red-50 border border-red-200">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-red-800">
          Algo salió mal
        </h2>
        <p className="text-sm text-red-600">
          {error?.message || 'Ha ocurrido un error inesperado'}
        </p>
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="mt-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Intentar de nuevo
          </button>
        )}
      </div>
    </div>
  );
} 