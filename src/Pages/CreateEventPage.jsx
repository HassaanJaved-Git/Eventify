
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateEventPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventType: 'public',
    eventDate: '',
    startTime: '',
    endTime: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    coordinates: '',
    coverImage: '',
    capacity: 100,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to create event
    setTimeout(() => {
      // Generate random ID for new event
      const newEventId = 'evt-' + Math.random().toString(36).substring(2, 10);

      // Redirect to the new event page
      navigate(`/event/${newEventId}`);
    }, 2000);
  };

  return (
    <div className="container w-50">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className=" rounded-4 shadow p-4 p-md-5" style={{ backgroundColor: "rgba(11, 11, 11, 0.1)" }}>
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
                    <label htmlFor="title\" className="form-label fw-bold" >Event Title</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Give your event a title"
                      required
                      style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}

                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
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
                    <label htmlFor="eventType" className="form-label fw-bold">Event Type</label>
                    <select
                      className="form-select"
                      id="eventType"
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
                    <label htmlFor="coverImage" className="form-label fw-bold">Cover Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="coverImage"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleChange}
                      style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />

                    <div className="form-text">
                      Select a cover image for your event
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-primary px-4"
                      onClick={handleNextStep}
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="mb-4">
                    <label htmlFor="startDate" className="form-label fw-bold">Event Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="startTime" className="form-label fw-bold">Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="endDate" className="form-label fw-bold">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      required
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="endTime" className="form-label fw-bold">End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="locationName" className="form-label fw-bold">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="locationName"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder= "Venue Address"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="locationName" className="form-label fw-bold">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                       placeholder= "Venue City"
                      required
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="locationName" className="form-label fw-bold">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder= "Venue State"
                      required
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="locationName" className="form-label fw-bold">Zip Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder= "Zip Code"
                    />
                  </div>

                  {formData.eventType !== 'online' && (
                    <div className="mb-4">
                      <label htmlFor="locationAddress" className="form-label fw-bold">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="locationAddress"
                        name="locationAddress"
                        value={formData.locationAddress}
                        onChange={handleChange}
                        placeholder="123 Main St, City, State, ZIP"
                        required={formData.eventType !== 'online'}
                          style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                      />
                    </div>
                  )}

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={handlePrevStep}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary px-4"
                      onClick={handleNextStep}
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <div className="mb-4">
                    <label htmlFor="capacity" className="form-label fw-bold">Capacity</label>
                    <input
                      type="number"
                      className="form-control"
                      id="capacity"
                      name="capacity"
                      min="1"
                      value={formData.capacity}
                      onChange={handleChange}
                      required
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />
                    <div className="form-text">
                      Maximum number of attendees
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="price" className="form-label fw-bold">Price ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      required
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    />
                    <div className="form-text">
                      Set to 0 for free events
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={handlePrevStep}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn login-button  px-4"
                      // className="btn btn-success px-4"
                      disabled={isSubmitting}
                        style={{ backgroundColor: "rgba(11, 11, 11, 0.1)", border: "none" }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2\" role="status\" aria-hidden="true"></span>
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
  );
}

export default CreateEventPage;
