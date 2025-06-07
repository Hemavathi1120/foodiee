
import React, { useState } from 'react';
import Button from '../atoms/Button';
import { useToast } from '@/hooks/use-toast';

const ReservationManagement = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+1 (555) 123-4567',
      date: '2024-01-20',
      time: '19:00',
      guests: 4,
      status: 'confirmed',
      notes: 'Anniversary dinner',
      createdAt: new Date('2024-01-15T14:30:00')
    },
    {
      id: '2',
      name: 'Bob Williams',
      email: 'bob@example.com',
      phone: '+1 (555) 987-6543',
      date: '2024-01-21',
      time: '20:30',
      guests: 2,
      status: 'pending',
      notes: 'Window table preferred',
      createdAt: new Date('2024-01-15T16:15:00')
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      phone: '+1 (555) 456-7890',
      date: '2024-01-19',
      time: '18:30',
      guests: 6,
      status: 'cancelled',
      notes: 'Business dinner',
      createdAt: new Date('2024-01-14T11:20:00')
    }
  ]);

  const updateReservationStatus = (id: string, status: string) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status } : res
    ));
    toast({
      title: "Reservation Updated",
      description: `Reservation for ${reservations.find(r => r.id === id)?.name} ${status}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'confirmed': return 'bg-green-500/20 text-green-400';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      case 'completed': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-serif text-white">Reservation Management</h2>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {reservation.name}
                </h3>
                <p className="text-gray-400">{reservation.email}</p>
                <p className="text-gray-400">{reservation.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(reservation.status)}`}>
                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-gray-500 text-sm">Date</p>
                <p className="text-white">{reservation.date}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Time</p>
                <p className="text-white">{reservation.time}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Guests</p>
                <p className="text-white">{reservation.guests}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Booked</p>
                <p className="text-white">{reservation.createdAt.toLocaleDateString()}</p>
              </div>
            </div>

            {reservation.notes && (
              <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                <p className="text-gray-300 text-sm">
                  <strong>Notes:</strong> {reservation.notes}
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {reservation.status === 'pending' && (
                <>
                  <Button 
                    size="sm" 
                    onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                  >
                    Confirm
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {reservation.status === 'confirmed' && (
                <>
                  <Button 
                    size="sm" 
                    onClick={() => updateReservationStatus(reservation.id, 'completed')}
                  >
                    Mark Completed
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationManagement;
