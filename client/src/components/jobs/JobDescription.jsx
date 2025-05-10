import React, { useState, useEffect } from "react";
import { Badge, Button } from "../ui/index";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  APPLICATION_API_END_POINT,
  JOB_API_END_POINT,
} from "@/utils/constants";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function JobDescription() {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);

  const applyJobHandler = async () => {
    console.log("Clicked Apply Button");
    if (!user?.token) {
      toast.error("You must be logged in to apply.");
      return;
    }

    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Apply API response:", res.data);

      if (res?.data?.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Apply job error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, dispatch]);

  useEffect(() => {
    const hasApplied =
      singleJob?.applications?.some(
        (application) =>
          application.applicant === user?._id || application.user === user?._id
      ) || false;

    console.log("User ID:", user?._id);
    console.log("Applications:", singleJob?.applications);
    console.log("Has Applied:", hasApplied);

    setIsApplied(hasApplied);
  }, [singleJob, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 p-8 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-semibold text-3xl text-gray-800">
            {singleJob?.title}
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <Badge className="bg-blue-100 text-blue-700 font-semibold text-sm px-4 py-1 rounded-lg">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="bg-orange-100 text-orange-600 font-semibold text-sm px-4 py-1 rounded-lg">
              {singleJob?.jobType}
            </Badge>
            <Badge className="bg-purple-100 text-purple-600 font-semibold text-sm px-4 py-1 rounded-lg">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`px-6 py-3 text-white rounded-xl ${
            isApplied
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h2 className="text-xl font-semibold border-b-2 pb-3 text-gray-800">
        Job Description
      </h2>
      <div className="space-y-4 my-6">
        <div className="text-lg font-medium text-gray-700">
          <span className="font-bold">Role: </span>
          <span className="text-gray-500">{singleJob?.title}</span>
        </div>
        <div className="text-lg font-medium text-gray-700">
          <span className="font-bold">Location: </span>
          <span className="text-gray-500">{singleJob?.location}</span>
        </div>
        <div className="text-lg font-medium text-gray-700">
          <span className="font-bold">Description: </span>
          <span className="text-gray-500">{singleJob?.description}</span>
        </div>
        <div className="text-lg font-medium text-gray-700">
          <span className="font-bold">Experience: </span>
          <span className="text-gray-500">{singleJob?.experience} yrs</span>
        </div>
        <div className="text-lg font-medium text-gray-700">
          <span className="font-bold">Salary: </span>
          <span className="text-gray-500">{singleJob?.salary}LPA</span>
        </div>
        <div className="text-lg font-medium text-gray-700">
          <span className="font-bold">Total Applicants: </span>
          <span className="text-gray-500">
            {singleJob?.applications?.length}
          </span>
        </div>
        <div className="text-lg font-medium text-gray-700">
          <span className="font-bold">Posted Date: </span>
          <span className="text-gray-500">
            {singleJob?.createdAt?.split("T")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
