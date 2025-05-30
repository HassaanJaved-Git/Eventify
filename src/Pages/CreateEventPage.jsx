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
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="bg-white rounded-4 shadow p-4 p-md-5">
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
                    <label htmlFor="title\" className="form-label fw-bold">Event Title</label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Give your event a title"
                      required
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
                    >
                      <option value="in-person">In Person</option>
                      <option value="online">Online</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="coverImage" className="form-label fw-bold">Cover Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      id="coverImage"
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                    />
                    <div className="form-text">
                      Add a URL to an image for your event cover
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-primary px-4"
                      onClick={handleNextStep}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <div className="mb-4">
                    <label htmlFor="startDate" className="form-label fw-bold">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
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
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="timezone" className="form-label fw-bold">Timezone</label>
                    <select
                      className="form-select"
                      id="timezone"
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleChange}
                    >
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="Europe/London">London (GMT)</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="locationName" className="form-label fw-bold">Location Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="locationName"
                      name="locationName"
                      value={formData.locationName}
                      onChange={handleChange}
                      placeholder={formData.eventType === 'online' ? 'Zoom Meeting' : 'Venue Name'}
                      required
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
                    />
                    <div className="form-text">
                      Set to 0 for free events
                    </div>
                  </div>
                  
                  <div className="mb-4 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isPrivate"
                      name="isPrivate"
                      checked={formData.isPrivate}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="isPrivate">
                      Make this event private (invitation only)
                    </label>
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
                      className="btn btn-success px-4"
                      disabled={isSubmitting}
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
