import Axios from "axios";
let getmemory = (id) => {
  let get = Axios.get("http://localhost:8080/api/v5/cart/" + id, {
    auth: {
      username: "admin",
      password: "123456",
    },
  });
  return get;
};
export default getmemory;
