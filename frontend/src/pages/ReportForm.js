import React, { useEffect, useState } from "react";
import { getCars, createReport } from "../api/api";
import ReportForm from "../components/ReportForm";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReportFormPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getCars()
      .then(d => mounted && setCars(d || []))
      .catch(() => mounted && setCars([]))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (carId, payload) => {
    try {
      await createReport(carId, payload);
      alert("Report queued for processing.");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to queue report.");
    }
  };

  const preselectedCar = location.state && location.state.selectedCar ? location.state.selectedCar : undefined;

  return (
    <>
      <div className="mb-4">
        <h1>Create Report</h1>
        <p className="lead">Submit performance or diagnostics report for a car.</p>
      </div>

      {loading ? <div>Loading...</div> : <ReportForm cars={cars} initial={preselectedCar} onSubmit={handleSubmit} />}
    </>
  );
}
