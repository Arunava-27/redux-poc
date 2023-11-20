const Loader = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="border-t-8 border-blue-500 border-solid rounded-full h-16 w-16 animate-spin"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
