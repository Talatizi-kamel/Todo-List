import styles from "./Signup.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
function Signup() {
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("il faut préciser votre nom")
      .min(2, "Un vrai nom"),
    email: yup
      .string()
      .email("Email invalide")
      .required("Vous devez renseigner un Email"),
    password: yup
      .string()
      .required("Mot de passe obligatoire")
      .min(8, "Mot de passe trop court"),
    prenom: yup
      .string()
      .required("il faut préciser votre prenom")
      .min(2, "Un vrai prenom"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    initialValues,
    resolver: yupResolver(validationSchema),
  });
  const submit = handleSubmit((credentials) => {
    console.log(credentials);
  });

  return (
    <div className="flex-fill d-flex align-items-center justify-content-center">
      <form
        onSubmit={submit}
        className={`${styles.form} d-flex flex-column card p-20`}
      >
        <h2 className="mb-20">Inscription</h2>
        <div className="mb-20 d-flex flex-column">
          <label htmlFor="name">Nom</label>
          <input type="text" name="name" {...register("name")}></input>
          {errors.name && <p className="form-error">{errors.name.message}</p>}
        </div>
        <div className="mb-20 d-flex flex-column">
          <label htmlFor="name">Prenom</label>
          <input type="text" name="prenom" {...register("prenom")}></input>
          {errors.prenom && (
            <p className="form-error">{errors.prenom.message}</p>
          )}
        </div>
        <div className="mb-20 d-flex flex-column">
          <label htmlFor="email">email</label>
          <input type="text" name="email" {...register("email")}></input>
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div className="mb-20 d-flex flex-column">
          <label htmlFor="name">Password</label>
          <input
            type="password"
            name="napassword"
            {...register("password")}
          ></input>
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        <div>
          <button className="btn btn-primary">Inscription</button>
        </div>
        {errors.email && <p className="form-error">{errors.generic.message}</p>}
      </form>
    </div>
  );
}

export default Signup;
