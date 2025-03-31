
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Calendar,
  Video,
  Search,
  Star,
  Users,
  Clock,
  CheckCircle,
  AlarmClock,
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: 'Video Consultation',
      description: 'Connect with doctors online from the comfort of your home.',
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: 'Clinic Appointments',
      description: 'Book in-person appointments with top specialists.',
    },
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: 'Emergency Blood',
      description: 'Find blood donors and blood banks in emergencies.',
    },
    {
      icon: <AlarmClock className="h-8 w-8 text-primary" />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for all your healthcare needs.',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Happy Patients' },
    { value: '1,000+', label: 'Specialist Doctors' },
    { value: '100+', label: 'Clinic Partners' },
    { value: '24/7', label: 'Customer Support' },
  ];

  const testimonials = [
    {
      content: 'The video consultation feature saved me so much time. I got my diagnosis and prescription without leaving home.',
      author: 'Ravi Kumar',
      role: 'Marketing Executive',
    },
    {
      content: 'I needed a blood donor urgently, and the app helped me find one in 30 minutes! A true lifesaver.',
      author: 'Priya Sharma',
      role: 'School Teacher',
    },
    {
      content: 'Booking lab tests and getting reports has never been easier. The My Doctor app has streamlined my healthcare routine.',
      author: 'Anand Patel',
      role: 'Software Engineer',
    },
  ];

  const healthTips = [
    'Stay hydrated by drinking at least 8 glasses of water daily.',
    'Aim for 30 minutes of physical activity 5 days a week.',
    'Include fruits and vegetables in every meal.',
    'Maintain good sleep hygiene with 7-8 hours of sleep.',
    'Practice mindfulness or meditation for mental health.',
    'Limit screen time, especially before bedtime.',
    'Eat a balanced diet rich in proteins, fiber, and healthy fats.',
    'Get regular health check-ups and screenings.',
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-sky-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Healthcare at Your <span className="text-primary">Fingertips</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Connect with top specialists, book appointments, find emergency blood donors, and manage your health—all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="px-8">
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/doctor-consultation">
                  <Button variant="outline" size="lg">
                    Find Doctors
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://img.freepik.com/free-vector/online-doctor-concept-illustration_114360-1783.jpg"
                alt="Doctor consultation illustration"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions designed to meet all your needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Tips Slider */}
      <section className="py-12 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Health Tips</h2>
          <div className="relative">
            <div className="flex space-x-12 animate-slide whitespace-nowrap">
              {healthTips.concat(healthTips).map((tip, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Simple steps to get the care you need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create an Account</h3>
              <p className="text-gray-600">Register with your details to access all our services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Find What You Need</h3>
              <p className="text-gray-600">Search for doctors, blood banks, or lab services.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Book & Consult</h3>
              <p className="text-gray-600">Schedule appointments or consult with doctors online.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600">Real stories from people who use our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take Control of Your Health?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of people who trust My Doctor for their healthcare needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-8">
                Register Now
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary px-8">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
