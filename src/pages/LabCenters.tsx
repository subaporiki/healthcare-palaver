
import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import { LabCenter } from '@/types';
import { useToast } from '@/hooks/use-toast';

// Mock lab centers data
const mockLabCenters: LabCenter[] = [
  {
    id: '1',
    name: 'Apollo Diagnostics',
    location: 'Chennai',
    address: '15 Greams Road, Chennai - 600006',
    phone: '+91 4428294999',
    services: ['Blood Test', 'Urine Test', 'X-Ray', 'CT Scan', 'MRI', 'Ultrasound'],
    ratings: 4.5,
    openingHours: 'Mon-Sat: 7:00 AM - 9:00 PM, Sun: 8:00 AM - 6:00 PM',
    coordinates: { lat: 13.0569, lng: 80.2425 }
  },
  {
    id: '2',
    name: 'Lister Metropolis',
    location: 'Chennai',
    address: '142 Mint Street, Chennai - 600001',
    phone: '+91 4425368000',
    services: ['Blood Test', 'Urine Test', 'Fecal Test', 'Thyroid Profile', 'Liver Function Test'],
    ratings: 4.2,
    openingHours: 'Mon-Sat: 6:30 AM - 8:00 PM, Sun: 7:00 AM - 5:00 PM',
    coordinates: { lat: 13.0878, lng: 80.2785 }
  },
  {
    id: '3',
    name: 'Medall Diagnostics',
    location: 'Chennai',
    address: '27 Woods Road, Royapettah, Chennai - 600014',
    phone: '+91 4442132000',
    services: ['Blood Test', 'Urine Test', 'Health Packages', 'CT Scan', 'PET-CT Scan', 'MRI'],
    ratings: 4.3,
    openingHours: 'Open 24 Hours',
    coordinates: { lat: 13.0595, lng: 80.2613 }
  },
  {
    id: '4',
    name: 'SRL Diagnostics',
    location: 'Madurai',
    address: '123 East Veli Street, Madurai - 625001',
    phone: '+91 4522345444',
    services: ['Blood Test', 'Urine Test', 'ECG', 'X-Ray', 'Ultrasound'],
    ratings: 4.1,
    openingHours: 'Mon-Sat: 7:00 AM - 9:00 PM, Sun: 8:00 AM - 2:00 PM',
    coordinates: { lat: 9.9195, lng: 78.1208 }
  },
  {
    id: '5',
    name: 'Thyrocare',
    location: 'Coimbatore',
    address: '45 DB Road, RS Puram, Coimbatore - 641002',
    phone: '+91 4224267890',
    services: ['Blood Test', 'Thyroid Profile', 'Diabetes Care', 'Health Packages'],
    ratings: 4.0,
    openingHours: 'Mon-Sat: 6:30 AM - 8:30 PM, Sun: 7:00 AM - 1:00 PM',
    coordinates: { lat: 11.0047, lng: 76.9650 }
  },
  {
    id: '6',
    name: 'Vijaya Diagnostic Centre',
    location: 'Salem',
    address: '67 Sarada College Road, Salem - 636007',
    phone: '+91 4272445678',
    services: ['Blood Test', 'ECG', 'X-Ray', 'Ultrasound', 'CT Scan'],
    ratings: 4.2,
    openingHours: 'Mon-Sat: 7:00 AM - 8:00 PM, Sun: 8:00 AM - 2:00 PM',
    coordinates: { lat: 11.6540, lng: 78.1545 }
  },
  {
    id: '7',
    name: 'Neuberg Diagnostics',
    location: 'Trichy',
    address: '12 Thillai Nagar Main Road, Trichy - 620018',
    phone: '+91 4312765789',
    services: ['Blood Test', 'Urine Test', 'X-Ray', 'MRI', 'CT Scan', 'Ultrasound'],
    ratings: 4.4,
    openingHours: 'Mon-Sat: 6:30 AM - 9:00 PM, Sun: 7:00 AM - 2:00 PM',
    coordinates: { lat: 10.8156, lng: 78.6973 }
  }
];

const locations = ['Chennai', 'Madurai', 'Coimbatore', 'Salem', 'Trichy'];
const services = [
  'Blood Test', 
  'Urine Test', 
  'X-Ray', 
  'CT Scan', 
  'MRI', 
  'Ultrasound', 
  'ECG',
  'Health Packages',
  'Thyroid Profile'
];

const LabCenters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const [labCenters, setLabCenters] = useState<LabCenter[]>([]);
  const [filteredLabCenters, setFilteredLabCenters] = useState<LabCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load lab centers data
  useEffect(() => {
    // For this demo, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setLabCenters(mockLabCenters);
      setFilteredLabCenters(mockLabCenters);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle search and filtering
  const handleSearch = () => {
    let filtered = [...labCenters];
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(lab => 
        lab.name.toLowerCase().includes(search) || 
        lab.location.toLowerCase().includes(search) ||
        lab.services.some(service => service.toLowerCase().includes(search))
      );
    }
    
    if (locationFilter) {
      filtered = filtered.filter(lab => lab.location === locationFilter);
    }
    
    if (serviceFilter) {
      filtered = filtered.filter(lab => lab.services.includes(serviceFilter));
    }
    
    setFilteredLabCenters(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No results found",
        description: "Try different search criteria.",
      });
    }
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setServiceFilter('');
    setFilteredLabCenters(labCenters);
  };

  // Book a test
  const handleBookTest = (labId: string) => {
    toast({
      title: "Booking feature",
      description: "Test booking functionality to be implemented soon.",
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Lab Centers</h1>
        <p className="text-gray-600 mb-8">
          Find diagnostic centers and book lab tests online for quick results.
        </p>
        
        {/* Search and Filter Bar */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Labs
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name or service"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Test Type
              </label>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">All Test Types</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-3">
            <Button variant="outline" onClick={clearFilters}>Clear</Button>
            <Button onClick={handleSearch}>Search Labs</Button>
          </div>
        </div>
        
        {/* Lab Centers List */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" message="Loading lab centers..." />
            </div>
          ) : filteredLabCenters.length > 0 ? (
            filteredLabCenters.map((lab) => (
              <Card key={lab.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-xl">{lab.name}</h3>
                          <p className="text-gray-500 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {lab.location} - {lab.address}
                          </p>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-1" />
                            {lab.openingHours}
                          </div>
                        </div>
                        <div className="bg-green-50 px-3 py-1 rounded-full flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span className="font-medium text-green-700">{lab.ratings}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Available Tests & Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {lab.services.map((service) => (
                            <span 
                              key={service} 
                              className={`px-3 py-1 text-xs rounded-full bg-blue-50 
                                ${service === serviceFilter ? 'bg-blue-100 text-blue-800' : 'text-blue-600'}`}
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 md:mt-0 md:ml-6">
                      <Button onClick={() => handleBookTest(lab.id)}>
                        Book Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-20">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-4 text-xl font-semibold">No lab centers found</h2>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
        
        {/* Popular Tests Banner */}
        <div className="bg-blue-50 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Popular Health Packages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Basic Health Checkup', price: 999 },
              { name: 'Comprehensive Health Package', price: 1999 },
              { name: 'Diabetes Screening', price: 799 },
              { name: 'Heart Health Package', price: 1499 }
            ].map((package_, index) => (
              <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="font-medium mb-1">{package_.name}</h3>
                <p className="text-gray-600">₹{package_.price}</p>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LabCenters;
