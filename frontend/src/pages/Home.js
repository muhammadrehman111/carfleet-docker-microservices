import React, { useEffect, useState } from "react";
import { getCars } from "../api/api";
import CarList from "../components/CarList";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    getCars()
      .then(data => { if (mounted) setCars(data || []); })
      .catch(() => { if (mounted) setCars([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleSelect = (car) => {
    navigate("/report/new", { state: { selectedCar: car } });
  };

  return (
    <>
      <div className="mb-4">
        <h1>Cars</h1>
        <p className="lead">Browse cars and create performance reports.</p>
      </div>

      {loading ? <div>Loading cars...</div> : <CarList cars={cars} onSelect={handleSelect} />}
    </>
  );
}
