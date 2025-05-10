import { setSingleCompany } from "../redux/companySlice";
import { COMPANY_API_END_POINT } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetchCompaniesById = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!companyId) return;

    const fetchSingleCompany = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : {};

        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${companyId}`,
          {
            headers,
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleCompany();
  }, [companyId, dispatch]);
};

export default useFetchCompaniesById;
