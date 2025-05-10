import React, { useState, useEffect } from "react";
import { Label, RadioGroup, RadioGroupItem } from "./ui/index";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    industry: "",
    salary: "",
  });

  const dispatch = useDispatch();

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [filterType]: value,
    }));
  };

  useEffect(() => {
    const query = Object.values(selectedFilters)
      .filter((val) => val !== "")
      .join(", ");

    dispatch(setSearchedQuery(query));
  }, [selectedFilters, dispatch]);

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <div>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            <RadioGroup
              value={selectedFilters[data.filterType.toLowerCase()]}
              onValueChange={(value) =>
                handleFilterChange(data.filterType.toLowerCase(), value)
              }
            >
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-2 my-2"
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId}>{item}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterCard;
