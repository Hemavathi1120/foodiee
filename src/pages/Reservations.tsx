
import React, { useState } from 'react';
import Header from '../components/organisms/Header';
import Footer from '../components/organisms/Footer';
import Button from '../components/atoms/Button';

const Reservations = () => {
  const [reservationData, setReservationData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', reservationData);
    // TODO: Implement reservation submission
    alert('Your reservation request has been submitted! We will confirm shortly.');
    setReservationData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      guests: '2',
      specialRequests: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value
    });
  };

  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', 
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl lg:text-7xl font-serif font-light mb-6">
            Make a <span className="text-amber-400">Reservation</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Book your table for an unforgettable culinary experience
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Reservation Form */}
              <div>
                <h2 className="text-3xl font-serif text-white mb-8">Reservation Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={reservationData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={reservationData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-white font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={reservationData.phone}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="date" className="block text-white font-medium mb-2">
                        Date *
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={reservationData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-white font-medium mb-2">
                        Time *
                      </label>
                      <select
                        id="time"
                        name="time"
                        value={reservationData.time}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="guests" className="block text-white font-medium mb-2">
                        Guests *
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        value={reservationData.guests}
                        onChange={handleChange}
                        required
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="specialRequests" className="block text-white font-medium mb-2">
                      Special Requests
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={reservationData.specialRequests}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors resize-none"
                      placeholder="Dietary restrictions, special occasions, seating preferences..."
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Reservation
                  </Button>
                </form>
              </div>

              {/* Information */}
              <div>
                <h2 className="text-3xl font-serif text-white mb-8">Reservation Information</h2>
                
                <div className="space-y-6 text-gray-300">
                  <div>
                    <h3 className="text-amber-400 font-medium mb-2">Dining Hours</h3>
                    <p>Monday - Thursday: 5:00 PM - 10:00 PM</p>
                    <p>Friday - Saturday: 5:00 PM - 11:00 PM</p>
                    <p>Sunday: 5:00 PM - 9:00 PM</p>
                  </div>

                  <div>
                    <h3 className="text-amber-400 font-medium mb-2">Reservation Policy</h3>
                    <p className="mb-2">
                      We require a valid credit card to secure your reservation. 
                      No charges will be made unless specified by our cancellation policy.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-amber-400 font-medium mb-2">Cancellation Policy</h3>
                    <p className="mb-2">
                      Cancellations must be made at least 24 hours in advance. 
                      Same-day cancellations may be subject to a fee.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-amber-400 font-medium mb-2">Dress Code</h3>
                    <p className="mb-2">
                      We maintain a smart casual to formal dress code. 
                      Jackets are recommended for gentlemen.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-amber-400 font-medium mb-2">Large Parties</h3>
                    <p className="mb-2">
                      For parties of 8 or more, please call us directly at 
                      (555) 123-4567 to arrange your reservation.
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gray-800 rounded-xl">
                  <h3 className="text-amber-400 font-medium mb-4">Need Help?</h3>
                  <p className="text-gray-300 mb-4">
                    Our reservation team is available to assist you with any special requests or questions.
                  </p>
                  <Button variant="outline">
                    Call (555) 123-4567
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reservations;
