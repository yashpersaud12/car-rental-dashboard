import { useState } from "react";
import "./App.css";

const vehicles = [
  "PAC 33220", "PAC 7836", "PAC 87", "PAF 1456", "PAG 9101",
  "PAH 9134", "PAH 2826", "PAH 2768", "PAJ 4188", "PAJ 4203",
  "PAJ 4189", "PAK 1459", "PAK 1453", "PAK 1457", "PAK 1458",
  "PAL 528", "PAE 2271", "PAH 6403", "PAK 9372", "PAK 9474"
];

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    vehicle: "", customer: "", phone: "", start: "", end: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setBookings([...bookings, form]);
    setForm({ vehicle: "", customer: "", phone: "", start: "", end: "" });
  };

  const getStatus = (vehicle) => {
    const today = new Date();
    return bookings.find(
      b => b.vehicle === vehicle &&
      new Date(b.start) <= today && today <= new Date(b.end)
    ) ? "Booked" : "Available";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Car Rental Admin Dashboard</h1>

      <div className="grid gap-2 mb-6">
        <input className="border p-2" name="vehicle" placeholder="Vehicle" value={form.vehicle} onChange={handleChange} />
        <input className="border p-2" name="customer" placeholder="Customer Name" value={form.customer} onChange={handleChange} />
        <input className="border p-2" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <input className="border p-2" type="date" name="start" value={form.start} onChange={handleChange} />
        <input className="border p-2" type="date" name="end" value={form.end} onChange={handleChange} />
        <button className="bg-blue-500 text-white p-2" onClick={handleSubmit}>Add Booking</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles.map(vehicle => (
          <div key={vehicle} className="border p-4 rounded-lg shadow">
            <h2 className="font-semibold text-lg">{vehicle}</h2>
            <p>Status: <span className={getStatus(vehicle) === 'Booked' ? 'text-red-600' : 'text-green-600'}>{getStatus(vehicle)}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}