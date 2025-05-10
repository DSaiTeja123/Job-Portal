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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
      <Table className="min-w-full">
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-sm font-semibold text-gray-600">
              Logo
            </TableHead>
            <TableHead className="text-sm font-semibold text-gray-600">
              Name
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
          {filterCompany?.map((company) => (
            <TableRow key={company._id} className="border-b hover:bg-gray-50">
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="rounded-md w-12 h-12 object-cover"
                  />
                </Avatar>
              </TableCell>
              <TableCell className="text-sm text-gray-800">
                {company.name}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {company.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="text-sm text-gray-800 text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer hover:text-primary-600 transition-colors duration-200" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 bg-white shadow-lg rounded-md p-2 border border-gray-200">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-primary-600 py-1 px-2 rounded-md transition-all duration-200"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
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
}

export default CompaniesTable;
