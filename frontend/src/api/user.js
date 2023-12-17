const API_ADDUSER = "http://localhost:3000/api/users/signin";
export async function createUser(newUser) {
  const response = await fetch(API_ADDUSER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Error api creatUser");
    }
  }
}
const API_LOGUSERS = "http://localhost:3000/api/users/login";

export async function LoginUser(credentials) {
  const response = await fetch(API_LOGUSERS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const body = await response.json();

  if (response.ok) {
    document.cookie = `token=${body.token}; path=/; secure; samesite=None`;
    console.log("cc je suis le coockie" + document.cookie);

    console.log(body);
    return body.token;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Oops une erreur est survenue");
    }
  }
}

const API_PROFILE = "http://localhost:3000/api/users/profile";

export async function profile() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token manquant");
  }

  const response = await fetch(API_PROFILE, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Échec de la récupération du profil");
  }

  const userProfile = await response.json();
  return userProfile;
}
