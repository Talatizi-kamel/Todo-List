import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthContext } from "../context";
import { useContext } from "react";

function Login() {
  const { login, user } = useContext(AuthContext);
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("l'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = handleSubmit(async (credentials) => {
    try {
      clearErrors();
      await login(credentials);
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <>
      <div className="flex-fill d-flex align-items-center justify-content-center">
        <form
          onSubmit={submit}
          className={`${styles.form} d-flex flex-column card p-20`}
        >
          <h2 className="mb-10">Connexion</h2>
          <div className="mb-10 d-flex flex-column">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" {...register("email")} />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-10 d-flex flex-column">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" {...register("password")} />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
          {errors.generic && (
            <div className="mb-10">
              <p className="form-error">{errors.generic.message}</p>
            </div>
          )}
          <div>
            <button disabled={isSubmitting} className="btn btn-primary">
              Connexion
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
