import React from "react";
import { Badge } from "./ui/index";
import { useNavigate } from "react-router-dom";

function LatestJobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-all"
    >
      <div>
        <h1 className="font-medium text-lg">
          {job?.company?.name || "Unknown Company"}
        </h1>
        <p className="text-sm text-gray-500">{job?.location || "India"}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title || "Job Title"}</h1>
        <p className="text-sm text-gray-600">
          {job?.description || "No description available"}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position || "N/A"} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType || "Full-time"}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary ? `${job.salary} LPA` : "Salary negotiable"}
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCard;
