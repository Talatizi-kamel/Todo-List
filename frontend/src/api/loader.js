import { profile } from "./user";
import { getCookie } from "./user";
export async function rootLoader() {
  const token = getCookie("token");
  if (token) {
    try {
      const userProfile = await profile();
      console.log(userProfile.nom);
      console.log("Profil de l'utilisateur :", userProfile);
      return profile();
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
      throw error;
    }
  } else {
    console.log("Aucun token trouvé, utilisateur non connecté");
    return null;
  }
}
