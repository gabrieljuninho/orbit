const Spinner = () => {
  return (
    <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
