import React from "react";

export default function CarList({ cars = [], onSelect }) {
  if (!cars || cars.length === 0) {
    return <p>No cars found.</p>;
  }

  return (
    <div className="row g-3">
      {cars.map((c) => (
        <div className="col-md-6" key={c.id}>
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{c.brand} {c.model}</h5>
              <p className="card-text mb-1"><strong>Year:</strong> {c.year || "-"}</p>
              <p className="card-text mb-1"><strong>Price:</strong> {c.price || "-"}</p>
              <button className="btn btn-sm btn-outline-primary mt-2" onClick={() => onSelect && onSelect(c)}>Create Report</button>
              <a className="btn btn-sm btn-link mt-2" href={`/reports/${c.id}`}>View Reports</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
