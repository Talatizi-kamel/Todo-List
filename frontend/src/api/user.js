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
    console.log(body);
    return body;
  } else {
    if (body) {
      throw body;
    } else {
      throw new Error("Oops une erreur est survenue");
    }
  }
}
