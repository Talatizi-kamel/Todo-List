import { profile } from "./user";
import { getCookie } from "./user";

export async function rootLoader() {
  const token = getCookie("token");
  if (token) {
    try {
      // Si le token est présent, appelez la fonction profile
      const userProfile = await profile();
      // Faites quelque chose avec le profil de l'utilisateur si nécessaire
      console.log("Profil de l'utilisateur :", userProfile);
      return await profile();
    } catch (error) {
      console.error("Erreur lors de la récupération du profil :", error);
    }
  } else {
    // Si le token est absent, vous pouvez choisir de ne rien faire ici
    console.log("Aucun token trouvé, utilisateur non connecté");
    return null;
  }
}
