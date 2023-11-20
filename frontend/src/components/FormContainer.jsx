/* eslint-disable react/prop-types */
const FormContainer = ({ children }) => {
  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-transparent shadow p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
