import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateEventPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'public',
    eventDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    image: '',
    capacity: 100,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleNextStep = () => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("eventType", formData.eventType);
    form.append("date", formData.eventDate);

    // Combine date + time
    const startISO = new Date(`${formData.eventDate}T${formData.startTime}`);
    const endISO = new Date(`${formData.endDate || formData.eventDate}T${formData.endTime}`);

    form.append("startTime", startISO.toISOString());
    form.append("endTime", endISO.toISOString());

    form.append("location", JSON.stringify({
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country || 'Pakistan', // Default fallback
    }));

    form.append("category", "General");
    form.append("price", formData.price);
    form.append("totalTickets", formData.capacity);

    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const res = await fetch("http://localhost:5000/api/event/create", {
        method: "POST",
        body: form,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Event created:", data);
        alert("Event Created Successfully");
        // toast.success('Event Added Successfully', { position: 'top-center' });
        navigate(`/`);
      } else {
        toast.error('Error Creating Event', { position: 'top-center' });
        console.error("Create event failed:", data);
      }
    } catch (err) {
      console.error("Request error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    <div className="container w-50">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="rounded-4 shadow p-4 p-md-5" style={{ backgroundColor: "rgba(11, 11, 11, 0.1)" }}>
            <h1 className="fw-bold mb-4">Create New Event</h1>

            <div className="mb-4">
              <div className="progress" style={{ height: '8px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${step * 33.33}%` }}
                  aria-valuenow={step * 33.33}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span className={`small ${step >= 1 ? 'fw-bold' : 'text-muted'}`}>Basic Info</span>
                <span className={`small ${step >= 2 ? 'fw-bold' : 'text-muted'}`}>Date & Location</span>
                <span className={`small ${step >= 3 ? 'fw-bold' : 'text-muted'}`}>Settings</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Event Title</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Give your event a title"
                      required
                      style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="5"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your event"
                      required
                      style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Event Type</label>
                    <select
                      className="form-select"
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    >
                      <option value="in-person">Public</option>
                      <option value="online">Private</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Cover Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleChange}
                      style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />
                    <div className="form-text">Select a cover image for your event</div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary px-4" onClick={handleNextStep}>
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Event Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* <div className="mb-4">
                    <label className="form-label fw-bold">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                    />
                  </div> */}

                  <div className="mb-4">
                    <label className="form-label fw-bold">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Venue Address"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">State</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. India, USA"
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary px-4" onClick={handlePrevStep}>
                      Back
                    </button>
                    <button type="button" className="btn btn-primary px-4" onClick={handleNextStep}>
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="mb-4">
                    <label className="form-label fw-bold">Capacity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="capacity"
                      min="1"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold">Price ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-text">Set to 0 for free events</div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-outline-secondary px-4" onClick={handlePrevStep}>
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success px-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Creating...
                        </>
                      ) : (
                        'Create Event'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CreateEventPage;
