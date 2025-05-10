import { setCompanies } from "../redux/companySlice";
import { COMPANY_API_END_POINT } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useFetchCompanies() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
        };

        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          headers,
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, []);
}

export default useFetchCompanies;
