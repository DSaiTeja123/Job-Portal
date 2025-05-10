import React from "react";
import {
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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constants";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const { user } = useSelector((store) => store.auth);

  const statusHandler = async (id, status) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
      <Table className="min-w-full">
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-sm font-semibold text-gray-600">
              Full Name
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-600">
              Email
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-600">
              Contact
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-600">
              Resume
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-600">
              Date
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-600 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id} className="border-b hover:bg-gray-50">
              <TableCell className="text-sm text-gray-800">
                {item?.applicant?.fullname}
              </TableCell>
              <TableCell className="text-sm text-gray-800">
                {item?.applicant?.email}
              </TableCell>
              <TableCell className="text-sm text-gray-800">
                {item?.applicant?.phoneNumber}
              </TableCell>
              <TableCell className="text-sm text-blue-600">
                {item?.applicant?.profile?.resume ? (
                  <a
                    className="underline"
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {item?.applicant.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-sm text-gray-800 text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer text-gray-600 hover:text-primary-600 transition-colors duration-200" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-white shadow-lg rounded-md p-2 border border-gray-200">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(item._id, status)}
                        className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-primary-600 py-1 px-2 rounded-md transition-all duration-200"
                      >
                        <span>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
