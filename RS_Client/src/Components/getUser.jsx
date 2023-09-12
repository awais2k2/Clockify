import { userAction } from "../Store/index";
import { useDispatch } from "react-redux";
import axios from "axios";

export function useGetUser() {
  const dispatch = useDispatch();
  const fetchuser = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      axios
        .get("http://localhost:4000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch(userAction.loggedIn(res.data));
        })
        .catch((error) => {});
    } else {
    }
  };

  return { fetchuser };
}
