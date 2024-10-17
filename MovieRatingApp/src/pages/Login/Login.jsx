import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signInWithPopup, signOut } from "firebase/auth";
import { userLogin, userLogout } from "../../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../config";
import { useMutation } from "@tanstack/react-query";
import { mutateLogin } from "./Auth";
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';


const Login = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  // Use the mutation hook to handle guest session creation
  const { mutate } = useMutation({
    mutationKey: ["Login"],
    mutationFn: mutateLogin,
  });

  

  const signInWithGoogle = async () => {
    try {
      // Set persistence to browser session
      await setPersistence(auth, browserSessionPersistence);
      
      // Sign in with Google
      const response = await signInWithPopup(auth, provider);
      const authUser = response.user;
  
      // Dispatch user login state
      dispatch(
        userLogin({
          user: authUser.uid,
          username: authUser.displayName,
          email: authUser.email,
          isLoggedIn: true,
        })
      );
  
      // After successful sign-in, create guest session
      mutate(undefined, {
        onSuccess: (data) => {
          console.log("Guest session created:", data.guest_session_id);
          localStorage.setItem("guest_session_id", data.guest_session_id); // Store guest session ID
          
          navigate("/");  // Explicitly navigate to home page
        },
        onError: (error) => {
          console.error("Failed to create guest session:", error);
        },
      });
    } catch (error) {
      console.log("Sign in error:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");  // Redirect to home after login
    } else {
      navigate("/login");  // Redirect to login if not authenticated
    }
  }, [isLoggedIn, navigate]);
  

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLogout());
      })
      .catch((error) => {
        console.log("Logout error:", error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home"); // Redirect to home if logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        {!isLoggedIn ? (
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-white text-black font-medium py-2 px-4 rounded-lg shadow-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
              viewBox="0 0 256 262"
              className="w-5 h-5 mr-2"
            >
              <path
                fill="#4285F4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              ></path>
              <path
                fill="#34A853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              ></path>
              <path
                fill="#FBBC05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              ></path>
              <path
                fill="#EB4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              ></path>
            </svg>
            Continue with Google
          </button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </>
  );
};

export default Login;
