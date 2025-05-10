import React, { useEffect } from "react";
import {
  Navbar,
  HeroSection,
  CategoryCarousel,
  Footer,
  LatestJobs,
} from "../components/index";
import { useFetchJobs } from "@/hooks/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useFetchJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
