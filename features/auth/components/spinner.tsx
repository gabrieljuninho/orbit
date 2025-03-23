"use client";

const Spinner = () => {
  return (
    <div className="inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
