import { setAllAdminJobs } from "../redux/jobSlice";
import { JOB_API_END_POINT } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetchAdmin = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: token ? `Bearer ${token}` : "",
        };

        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          headers,
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useFetchAdmin;
