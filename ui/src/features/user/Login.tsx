// Login.tsx
import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LandingIntro from "./LandingIntro";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { RootState, AppDispatch } from "../../store";
import { setErrorMessage, setUsername, setPassword } from "./userSlice";
import { loginUser } from "./userSlice";

function Login(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { username, password, loading, errorMessage } = useSelector(
    (state: RootState) => state.user,
  );

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setErrorMessage(""));

    if (username.trim() === "") {
      return dispatch(setErrorMessage("Username is required!"));
    }
    if (password.trim() === "") {
      return dispatch(setErrorMessage("Password is required!"));
    }

    dispatch(loginUser({ username, password }));
  };

  const handleUsernameChange = (value: string) => {
    dispatch(setUsername(value));
  };

  const handlePasswordChange = (value: string) => {
    dispatch(setPassword(value));
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <InputText
                  type="username"
                  defaultValue={username}
                  updateType="username"
                  containerStyle="mt-4"
                  labelTitle="Username"
                  updateFormValue={(username) =>
                    handleUsernameChange(username.value)
                  }
                />

                <InputText
                  type="password"
                  defaultValue={password}
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={(password) =>
                    handlePasswordChange(password.value)
                  }
                />
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Login
              </button>

              <div className="text-center mt-4">
                Don't have an account yet?{" "}
                <Link to="/register">
                  <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
