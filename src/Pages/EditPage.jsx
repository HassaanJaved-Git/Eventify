import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import '../Allcss/editPage.css'
import 'react-toastify/dist/ReactToastify.css';

function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


    // const navigate = useNavigate();

 

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:5000/api/event/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(({ event }) => {
        if (!event) throw new Error("Event not found");

        setFormData({
          title: event.title,
          description: event.description,
          eventType: event.eventType,
          eventDate: event.date?.slice(0, 10),
          startTime: new Date(event.startTime).toISOString().slice(11, 16),
          endTime: new Date(event.endTime).toISOString().slice(11, 16),
          address: event.location?.address || '',
          city: event.location?.city || '',
          state: event.location?.state || '',
          zipCode: event.location?.zipCode || '',
          country: event.location?.country || '',
          price: event.price,
          capacity: event.totalTickets,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load event");
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const token = localStorage.getItem('token');
    const form = new FormData();

    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("eventType", formData.eventType);
    form.append("date", formData.eventDate);
    form.append("startTime", new Date(`${formData.eventDate}T${formData.startTime}`).toISOString());
    form.append("endTime", new Date(`${formData.eventDate}T${formData.endTime}`).toISOString());

    form.append("location", JSON.stringify({
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
    }));

    form.append("price", formData.price);
    form.append("totalTickets", formData.capacity);

    try {
      const res = await fetch(`http://localhost:5000/api/event/update/${id}`, {
        method: 'PUT',
        body: form,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success('Event updated successfully');
        navigate('/');
      } else {
        toast.error('Failed to update event');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className='bg-light text-dark'>Loading...</div>;
  if (!formData) return <div>Failed to load event data.</div>;

  return (
    <div className='bg-light py-5 text-dark'>
    <div className="container edit-form text-dark">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Event Type</label>
          <select name="eventType" className="form-select" value={formData.eventType} onChange={handleChange}>
            <option value="in-person">Public</option>
            <option value="online">Private</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} rows="4" required></textarea>
        </div>

        <div className="col-md-4">
          <label className="form-label">Date</label>
          <input type="date" name="eventDate" className="form-control" value={formData.eventDate} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Start Time</label>
          <input type="time" name="startTime" className="form-control" value={formData.startTime} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">End Time</label>
          <input type="time" name="endTime" className="form-control" value={formData.endTime} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">City</label>
          <input type="text" name="city" className="form-control" value={formData.city} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">State</label>
          <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Zip Code</label>
          <input type="text" name="zipCode" className="form-control" value={formData.zipCode} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Country</label>
          <input type="text" name="country" className="form-control" value={formData.country} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Capacity</label>
          <input type="number" name="capacity" className="form-control" value={formData.capacity} onChange={handleChange} />
        </div>

        <div className="col-12 text-end">
  <button 
  type="button" 
  className="btn btn-secondary" 
  onClick={() => navigate('/private')} 
  style={{ marginLeft: 0 }}
>
  Cancel
</button>


          <button type="submit" className="btn btn-success" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default EditEventPage;
