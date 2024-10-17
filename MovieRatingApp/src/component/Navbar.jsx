import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../slice/userSlice";
import { auth } from "../config";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLogout());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav className="bg-black p-4 flex justify-between items-center font-caveat sticky top-0 z-50 flex-wrap">
      <div className="flex space-x-12 pl-10 flex-grow">
        {/* Home Link */}
        <Link
          to="/"
          className="text-2xl md:text-4xl font-semibold text-white hover:text-red-800 transition duration-300 transform hover:scale-105"
        >
          Home
        </Link>

        {/* Rated Link */}
        <Link
          to="/rated"
          className="text-2xl md:text-4xl font-semibold text-white hover:text-red-600 transition duration-300 transform hover:scale-105"
        >
          Rated
        </Link>
      </div>

      <div className="pr-4">
        {isLoggedIn ? (
          <button
            className="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl md:text-3xl font-bold cursor-pointer relative z-10 group"
            onClick={handleLogout}
          >
            Logout
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-white rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-left"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-red-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-left"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-red-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-left"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-1.5 left-8 z-10">
              Logout
            </span>
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
