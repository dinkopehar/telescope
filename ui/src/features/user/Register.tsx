import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { register } from "../../api";

interface RegisterObj {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const Register: React.FC = () => {
  const INITIAL_REGISTER_OBJ: RegisterObj = {
    username: "",
    password: "",
    email: "",
    password2: "",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [registerObj, setRegisterObj] =
    useState<RegisterObj>(INITIAL_REGISTER_OBJ);

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (registerObj.username.trim() === "")
      return setErrorMessage("Username is required!");
    if (registerObj.email.trim() === "")
      return setErrorMessage("Email is required!");
    if (registerObj.password.trim() === "")
      return setErrorMessage("Password is required!");
    if (registerObj.password2 !== registerObj.password)
      return setErrorMessage("Passwords do not match!");
    else {
      setLoading(true);
      register(
        registerObj.username,
        registerObj.password,
        registerObj.password2,
        registerObj.email,
      )
        .then(() => {
          window.location.href = "/login";
        })
        .catch((error) => {
          for (const key in error.response.data) {
            setErrorMessage(error.response.data[key]);
          }
        });
      setLoading(false);
    }
  };

  const updateFormValue = ({
    updateType,
    value,
  }: {
    updateType: keyof RegisterObj;
    value: string;
  }) => {
    setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Register
            </h2>
            <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-4">
                <InputText
                  defaultValue={registerObj.username}
                  updateType="username"
                  containerStyle="mt-4"
                  labelTitle="Name"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  defaultValue={registerObj.email}
                  updateType="email"
                  containerStyle="mt-4"
                  labelTitle="Email"
                  updateFormValue={updateFormValue}
                />
                <InputText
                  defaultValue={registerObj.password}
                  type="password"
                  updateType="password"
                  containerStyle="mt-4"
                  labelTitle="Password"
                  updateFormValue={updateFormValue}
                />

                <InputText
                  defaultValue={registerObj.password2}
                  type="password"
                  updateType="password2"
                  containerStyle="mt-4"
                  labelTitle="Repeat Password"
                  updateFormValue={updateFormValue}
                />
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                type="submit"
                className={
                  "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                }
              >
                Register
              </button>

              <div className="text-center mt-4">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Login
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
