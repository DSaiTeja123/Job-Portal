import React, { useEffect } from "react";
import { Navbar, Job } from "../index";
import { useSelector, useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useFetchJobs } from "@/hooks/index";

function SearchJob() {
  useFetchJobs();

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4">
        <h1 className="font-bold text-2xl text-gray-800 mb-6">
          Search Results ({allJobs.length})
        </h1>

        {/* Job Listings Grid */}
        {allJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allJobs.map((job) => (
              <div
                key={job._id}
                className="transition-all transform hover:scale-105"
              >
                <Job job={job} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-48 text-xl text-gray-600">
            <span>No jobs found for your search.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchJob;
