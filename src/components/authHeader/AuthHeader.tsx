export default function authHeader() {
  const userString = localStorage.getItem("user"); // Assuming the token is stored with the key "token"
  if (!userString) {
    console.log("No user found");
    return;
  }
  const user = JSON.parse(userString);

  if (user && user.data.data.token) {
    return { Authorization: "Bearer " + user.data.data.token };
  } else {
    return {};
  }
}
