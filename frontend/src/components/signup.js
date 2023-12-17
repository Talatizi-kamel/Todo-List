import styles from "./Signup.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUser } from "../api/user";
// import { useNavigate } from 'react-router-dom';

function Signup() {
  // const navigate = useNavigate();

  const validationSchema = yup.object({
    nom: yup
      .string()
      .required("Il faut préciser votre nom")
      .min(2, "Un vrai nom"),
    prenom: yup
      .string()
      .required("Il faut préciser votre prénom")
      .min(2, "Un vrai prénom"),
    email: yup
      .string()
      .required("Il faut préciser votre email")
      .email("L'email n'est pas valide"),
    password: yup
      .string()
      .required("Il faut préciser votre mot de passe")
      .min(6, "Mot de passe trop court"),
  });

  const initialValues = {
    nom: "",
    prenom: "",
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

  const submit = handleSubmit(async (user) => {
    try {
      clearErrors();
      await createUser(user);
      // navigate('/signin');
    } catch (message) {
      setError("generic", { type: "generic", message });
    }
  });

  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      <form
        onSubmit={submit}
        className={`${styles.form} d-flex flex-column card p-20`}
      >
        <h2 className="mb-10">Inscription</h2>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="nom">Nom</label>
          <input type="text" name="nom" {...register("nom")} />
          {errors.nom && <p className="form-error">{errors.nom.message}</p>}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="prenom">prénom</label>
          <input type="text" name="prenom" {...register("prenom")} />
          {errors.prenom && (
            <p className="form-error">{errors.prenom.message}</p>
          )}
        </div>
        <div className="mb-10 d-flex flex-column">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" {...register("email")} />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
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
            Inscription
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
