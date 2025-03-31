
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Video, User, Search, Flask, Bell, AlertTriangle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Appointment } from '@/types';
import { format } from 'date-fns';

const Dashboard = () => {
  const { currentUser, userDetails } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!currentUser) return;

      try {
        const appointmentsRef = collection(db, 'appointments');
        const q = query(
          appointmentsRef,
          where('patientId', '==', currentUser.uid),
          orderBy('date', 'asc'),
          limit(5)
        );
        
        const querySnapshot = await getDocs(q);
        const appointmentsData: Appointment[] = [];
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          appointmentsData.push({
            id: doc.id,
            ...data,
            date: data.date.toDate(),
          } as Appointment);
        });
        
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser]);

  const services = [
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: 'Doctor Consultation',
      description: 'Connect with top specialists through video or book clinic visits.',
      link: '/doctor-consultation',
    },
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      title: 'Emergency Blood',
      description: 'Find blood donors and blood banks in your vicinity quickly.',
      link: '/blood-seeking',
    },
    {
      icon: <Flask className="h-8 w-8 text-green-500" />,
      title: 'Lab Tests',
      description: 'Book diagnostic tests and get reports online from trusted labs.',
      link: '/lab-centers',
    },
    {
      icon: <User className="h-8 w-8 text-blue-500" />,
      title: 'Profile',
      description: 'Manage your health records and personal information.',
      link: '/profile',
    },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome{userDetails ? `, ${userDetails.fullName}` : ''}!
          </h1>
          <p className="text-gray-600 mt-1">Here's an overview of your health dashboard</p>
        </div>

        {/* Quick Actions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Link key={index} to={service.link}>
                <Card className="h-full hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-2">
                    <div className="mb-2">{service.icon}</div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <Link to="/doctor-consultation">
                    <Button variant="outline" size="sm">
                      Book New
                    </Button>
                  </Link>
                </div>
                <CardDescription>Your scheduled consultations and clinic visits</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner />
                  </div>
                ) : appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center p-3 border rounded-md hover:bg-gray-50"
                      >
                        <div className={`p-2 rounded-full ${appointment.type === 'video' ? 'bg-blue-100' : 'bg-green-100'} mr-4`}>
                          {appointment.type === 'video' ? (
                            <Video className="h-5 w-5 text-blue-700" />
                          ) : (
                            <Calendar className="h-5 w-5 text-green-700" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{appointment.doctorName}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{format(new Date(appointment.date), 'MMM dd, yyyy')}</span>
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>No upcoming appointments</p>
                    <p className="text-sm mt-1">Book a consultation to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Health Status & Notifications */}
          <div>
            {/* Notifications Card */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Notifications</CardTitle>
                  <Bell className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-800">Your next appointment is scheduled in 3 days.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-md">
                    <p className="text-sm text-green-800">Lab test results are now available.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-md">
                    <p className="text-sm text-yellow-800">It's time for your monthly health check-up.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Find a Specialist
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Medical History
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Flask className="h-4 w-4 mr-2" />
                    Order Medicines
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Set Medication Reminders
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper function to get status color
function getStatusColor(status: string): string {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default Dashboard;
