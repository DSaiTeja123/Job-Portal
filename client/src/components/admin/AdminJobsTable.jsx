import React, { useState, useEffect } from "react";
import {
  Avatar,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/index";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredData = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredData);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-sm font-medium text-gray-700">
              Company Name
            </TableHead>
            <TableHead className="text-sm font-medium text-gray-700">
              Role
            </TableHead>
            <TableHead className="text-sm font-medium text-gray-700">
              Date
            </TableHead>
            <TableHead className="text-sm font-medium text-gray-700 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id} className="border-b hover:bg-gray-50">
              <TableCell className="text-sm text-gray-800">
                {job?.company?.name}
              </TableCell>
              <TableCell className="text-sm text-gray-800">
                {job?.title}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {job?.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-sm text-gray-800 text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-primary-600 transition-colors duration-300" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 bg-white shadow-lg rounded-md p-2 border border-gray-200">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer text-gray-700 hover:text-primary-600 py-1 px-2 rounded-md transition-all duration-200"
                    >
                      <Edit2 className="w-4 text-gray-500" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer text-gray-700 hover:text-primary-600 py-1 px-2 rounded-md transition-all duration-200 mt-2"
                    >
                      <Eye className="w-4 text-gray-500" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
