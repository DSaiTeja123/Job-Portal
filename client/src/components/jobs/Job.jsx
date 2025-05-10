import React from "react";
import { Button, Avatar, AvatarImage, Badge } from "../ui/index";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full p-2" size="icon">
          <Bookmark className="text-gray-600 hover:text-[#7209b7] transition duration-300" />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <Button className="p-4" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-xl text-gray-800">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 my-4">
        <h1 className="font-bold text-2xl text-gray-800">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <Badge className="text-blue-700 font-medium" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-medium" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-medium" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-6 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="text-[#7209b7] border-[#7209b7] hover:bg-[#7209b7] hover:text-white transition duration-300"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white hover:bg-[#5e0197] transition duration-300">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
