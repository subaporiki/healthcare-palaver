
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">My Doctor</h3>
            <p className="text-gray-300 mb-4">
              Providing quality healthcare services at your convenience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/doctor-consultation" className="text-gray-300 hover:text-white">Doctors</Link>
              </li>
              <li>
                <Link to="/blood-seeking" className="text-gray-300 hover:text-white">Blood Banks</Link>
              </li>
              <li>
                <Link to="/lab-centers" className="text-gray-300 hover:text-white">Lab Centers</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white">Resources</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Video Consultation</li>
              <li className="text-gray-300">Clinic Appointment</li>
              <li className="text-gray-300">Emergency Blood Request</li>
              <li className="text-gray-300">Lab Test Booking</li>
              <li className="text-gray-300">Health Records</li>
              <li className="text-gray-300">AI Health Assistant</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1" />
                <p className="text-gray-300">123 Healthcare Street, Medical City, 600001</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-primary" />
                <p className="text-gray-300">info@mydoctor.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-primary" />
                <p className="text-gray-300">+91 800 456 7890</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} My Doctor. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
