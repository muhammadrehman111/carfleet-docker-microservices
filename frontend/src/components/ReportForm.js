import React, { useState, useEffect } from "react";

export default function ReportForm({ cars = [], onSubmit, initial = {} }) {
  const [carId, setCarId] = useState(initial.id || initial.car_id || "");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [metrics, setMetrics] = useState("");

  useEffect(() => {
    if (!carId && cars && cars.length > 0) {
      setCarId(cars[0].id);
    }
  }, [cars]);

  const submit = (e) => {
    e.preventDefault();
    if (!carId) return alert("Select a car.");
    // payload sends an object (your backend just queues it)
    const payload = { title, details, metrics };
    onSubmit(carId, payload);
  };

  return (
    <form onSubmit={submit}>
      <div className="mb-3">
        <label className="form-label">Car</label>
        <select className="form-select" value={carId} onChange={e => setCarId(e.target.value)}>
          <option value="">-- select car --</option>
          {cars.map(c => (
            <option key={c.id} value={c.id}>
              {c.brand} {c.model} {c.year ? `(${c.year})` : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} className="form-control" placeholder="Short title" />
      </div>

      <div className="mb-3">
        <label className="form-label">Details</label>
        <textarea value={details} onChange={e => setDetails(e.target.value)} className="form-control" rows="4" />
      </div>

      <div className="mb-3">
        <label className="form-label">Metrics (text or JSON)</label>
        <textarea value={metrics} onChange={e => setMetrics(e.target.value)} className="form-control" rows="3" placeholder='e.g. {"0-60":"6.2s","topSpeed":"155mph"}' />
      </div>

      <button type="submit" className="btn btn-primary">Submit Report</button>
    </form>
  );
}
