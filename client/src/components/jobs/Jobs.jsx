import React, { useEffect, useState } from "react";
import { Navbar, FilterCard, Job } from "../index";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Jobs() {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-10 px-4">
        <div className="flex gap-6">
          {/* Sidebar with Filters */}
          <div className="w-1/4 p-5 bg-white rounded-lg shadow-lg sticky top-10">
            <FilterCard />
          </div>

          {/* Job Listings */}
          <div className="flex-1 h-full pb-6">
            {filterJobs.length <= 0 ? (
              <div className="flex justify-center items-center h-full text-xl text-gray-600">
                <span>No jobs found for your search</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
