import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportsForCar, getCarById } from "../api/api";

export default function ReportsPage() {
  const { carId } = useParams();
  const [reports, setReports] = useState([]);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const [r, c] = await Promise.all([
          getReportsForCar(carId),
          getCarById(carId).catch(()=>null)
        ]);
        if (mounted) {
          setReports(r || []);
          setCar(c || null);
        }
      } catch (err) {
        if (mounted) {
          setReports([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [carId]);

  return (
    <>
      <div className="mb-4">
        <h1>Reports {car ? `for ${car.brand} ${car.model}` : ""}</h1>
      </div>

      {loading ? <div>Loading reports...</div> : (
        <div className="list-group">
          {reports.length === 0 && <div>No reports found.</div>}
          {reports.map(r => (
            <div key={r.id} className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{(r.data && r.data.title) || "Untitled report"}</h5>
                <small>{new Date(r.created_at || Date.now()).toLocaleString()}</small>
              </div>
              <p className="mb-1">{(r.data && r.data.details) || JSON.stringify(r.data)}</p>
              <small className="text-muted">{r.data && r.data.metrics ? `Metrics: ${typeof r.data.metrics === 'string' ? r.data.metrics : JSON.stringify(r.data.metrics)}` : ""}</small>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
