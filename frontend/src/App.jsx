import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />
      <ToastContainer className="p-4 fixed top-0 right-0" />
      <div className="container mx-auto my-2">
        <Outlet />
      </div>
    </>
  );
}

export default App;
