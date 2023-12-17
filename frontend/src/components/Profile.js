import { useContext } from "react";
import styles from "./Profile.module.scss";
import { AuthContext } from "../context/AuthContext";
function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex-fill d-flex justify-content-center align-items-center">
      <div className={`${styles.profileContainer} card p-20`}>
        <h3 className="mb-20">Page de profile </h3>
        <ul>
          <li>Nom :{user[0].nom}</li>
          <li>Prénom : {user[0].prenom}</li>
          <li>email : {user[0].email}</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
