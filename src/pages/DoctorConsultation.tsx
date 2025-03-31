
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Search, Filter, Star, Video, Calendar, X, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocation } from 'react-router-dom';
import { Doctor } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import VideoConsultation from '@/components/VideoConsultation';
import AppointmentBooking from '@/components/AppointmentBooking';

// Mock data for doctors
const doctorsData: Doctor[] = [
  {
    doctorId: 1,
    name: "Dr. Aravind",
    role: "ENT Specialist",
    gender: "Male",
    description: "Expert in otolaryngology at Chennai.",
    experience: 15.0,
    price: 2000.00,
    imageURL: "https://th.bing.com/th/id/OIP.xe-ilxtZnmRc0Nd47btnQQAAAA?w=183&h=209&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    rating: 4.5
  },
  {
    doctorId: 2,
    name: "Dr. Meera Priyadarshini",
    role: "ENT Specialist",
    gender: "Female",
    description: "Skilled ENT surgeon in Coimbatore.",
    experience: 12.0,
    price: 1800.00,
    imageURL: "https://th.bing.com/th/id/OIP.ETzjd8CiWdmRt8SjPh3vXgHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    rating: 4.2
  },
  {
    doctorId: 3,
    name: "Dr. Rajasekaran",
    role: "ENT Specialist",
    gender: "Male",
    description: "Renowned for ear surgeries in Madurai.",
    experience: 20.0,
    price: 2200.00,
    imageURL: "https://th.bing.com/th/id/OIP.tb5NqBCj8-Ul6KA120QftgHaHa?w=174&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    rating: 4.7
  },
  {
    doctorId: 4,
    name: "Dr. Saranya Shankar",
    role: "ENT Specialist",
    gender: "Female",
    description: "Experienced otolaryngologist in Trichy.",
    experience: 18.0,
    price: 2100.00,
    imageURL: "https://th.bing.com/th/id/OIP.BVLxB8CbqkSbBBckNrY6_QHaHa?w=196&h=196&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    rating: 4.4
  },
  {
    doctorId: 5,
    name: "Dr. Vivek R",
    role: "ENT Specialist",
    gender: "Male",
    description: "Specialist in ENT disorders at Salem.",
    experience: 14.0,
    price: 1900.00,
    imageURL: "https://th.bing.com/th/id/OIP.NlCHnHeYklAsJUZfhokaOAHaHa?w=167&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    rating: 4.1
  },
  {
    doctorId: 6,
    name: "Dr. Lakshmi Srinivasan",
    role: "Gynecologist",
    gender: "Female",
    description: "Leading gynecologist in Chennai.",
    experience: 18.0,
    price: 2500.00,
    imageURL: "https://bewellhospitals.in/admin/assets/images/upload/IMG_2871.jpg",
    rating: 4.8
  },
  {
    doctorId: 7,
    name: "Dr. Revathi Chandran",
    role: "Gynecologist",
    gender: "Female",
    description: "Pioneer in maternal care at Trichy.",
    experience: 22.0,
    price: 2600.00,
    imageURL: "https://th.bing.com/th/id/OIP.1OeuWZHb1MEaxsLTJKWJ9gAAAA?w=147&h=194&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    rating: 4.9
  },
  {
    doctorId: 8,
    name: "Dr. Nalini Suresh",
    role: "Gynecologist",
    gender: "Female",
    description: "Experienced obstetrician in Coimbatore.",
    experience: 16.0,
    price: 2400.00,
    imageURL: "https://th.bing.com/th/id/OIP.pALyDjwvfWxWT_dSQCOnhQAAAA?w=169&h=209&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    rating: 4.3
  },
  {
    doctorId: 9,
    name: "Dr. Preethi Arul",
    role: "Gynecologist",
    gender: "Female",
    description: "Expert in reproductive health at Madurai.",
    experience: 20.0,
    price: 2700.00,
    imageURL: "https://bewellhospitals.in/admin/assets/images/upload/qq_1.jpg",
    rating: 4.7
  },
  {
    doctorId: 10,
    name: "Dr. Karthik V",
    role: "Gynecologist",
    gender: "Male",
    description: "Renowned specialist in Salem.",
    experience: 15.0,
    price: 2300.00,
    imageURL: "https://www.bewellhospitals.in/admin/assets/images/upload/Dr_Ram_praveen.png",
    rating: 4.0
  },
  {
    doctorId: 11,
    name: "Dr. Gopalakrishnan R",
    role: "Pediatrician",
    gender: "Male",
    description: "Specialist in child healthcare in Chennai.",
    experience: 25.0,
    price: 2300.00,
    imageURL: "https://th.bing.com/th/id/OIP.-VwsZx1SBSFjdmeV60tE4gAAAA?w=199&h=199&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    rating: 4.8
  },
  {
    doctorId: 12,
    name: "Dr. Divya Sundar",
    role: "Pediatrician",
    gender: "Female",
    description: "Child specialist in Trichy.",
    experience: 14.0,
    price: 2100.00,
    imageURL: "https://th.bing.com/th/id/OIP.qi5osnqv3vmT4pYhYycb2AHaHj?w=192&h=196&c=7&r=0&o=5&dpr=1.4&pid=1.7",
    rating: 4.2
  }
];

// Get all specialties from doctors data
const allSpecialties = Array.from(new Set(doctorsData.map(doctor => doctor.role)));

const DoctorConsultation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 5000]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [visibleDoctors, setVisibleDoctors] = useState<Doctor[]>([]);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('');
  const [videoConsultationDoctor, setVideoConsultationDoctor] = useState<Doctor | null>(null);
  const [bookAppointmentDoctor, setBookAppointmentDoctor] = useState<Doctor | null>(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const querySpecialty = queryParams.get('specialty');

  // Load doctors with specialty filter from query params
  useEffect(() => {
    setLoading(true);
    
    // Simulate API fetch
    setTimeout(() => {
      // Apply specialty filter from query params
      if (querySpecialty) {
        setSelectedSpecialty(querySpecialty);
      }
      
      // Add random ratings if not present
      const doctorsWithRatings = doctorsData.map(doctor => ({
        ...doctor,
        rating: doctor.rating || Math.floor(Math.random() * 10 + 35) / 10, // Random rating between 3.5 and 5.0
      }));
      
      setAllDoctors(doctorsWithRatings);
      setLoading(false);
    }, 1000);
  }, [querySpecialty]);

  // Filter and sort doctors
  useEffect(() => {
    let filtered = [...allDoctors];
    
    // Apply filters
    if (selectedSpecialty) {
      filtered = filtered.filter(doctor => doctor.role === selectedSpecialty);
    }
    
    if (priceRange) {
      filtered = filtered.filter(
        doctor => doctor.price >= priceRange[0] && doctor.price <= priceRange[1]
      );
    }
    
    if (ratingFilter > 0) {
      filtered = filtered.filter(doctor => doctor.rating && doctor.rating >= ratingFilter);
    }
    
    // Apply search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        doctor =>
          doctor.name.toLowerCase().includes(searchLower) ||
          doctor.role.toLowerCase().includes(searchLower) ||
          doctor.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sorting
    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortOption === 'exp-desc') {
      filtered.sort((a, b) => b.experience - a.experience);
    }
    
    setVisibleDoctors(filtered);
  }, [allDoctors, searchTerm, selectedSpecialty, priceRange, ratingFilter, sortOption]);

  const resetFilters = () => {
    setSelectedSpecialty('');
    setPriceRange([1000, 5000]);
    setRatingFilter(0);
  };

  // Handle video consultation
  const handleVideoConsultation = (doctor: Doctor) => {
    setVideoConsultationDoctor(doctor);
  };

  // Handle appointment booking
  const handleBookAppointment = (doctor: Doctor) => {
    setBookAppointmentDoctor(doctor);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Doctor Consultation</h1>
        <p className="text-gray-600 mb-8">
          Find and book appointments with top specialists for video consultation or clinic visits.
        </p>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by doctor name, specialty, etc."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            
            <Select onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <span>{sortOption ? getSortLabel(sortOption) : 'Sort By'}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating-desc">Highest Rated</SelectItem>
                <SelectItem value="exp-desc">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedSpecialty || ratingFilter > 0 || searchTerm) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedSpecialty && (
              <div className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm flex items-center">
                {selectedSpecialty}
                <button onClick={() => setSelectedSpecialty('')}>
                  <X className="ml-1 h-4 w-4" />
                </button>
              </div>
            )}
            
            {ratingFilter > 0 && (
              <div className="bg-yellow-100 text-yellow-800 rounded-full px-3 py-1 text-sm flex items-center">
                {ratingFilter}+ Rating
                <button onClick={() => setRatingFilter(0)}>
                  <X className="ml-1 h-4 w-4" />
                </button>
              </div>
            )}
            
            {searchTerm && (
              <div className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm flex items-center">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm('')}>
                  <X className="ml-1 h-4 w-4" />
                </button>
              </div>
            )}
            
            <button 
              className="text-sm text-primary hover:underline" 
              onClick={resetFilters}
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Doctors List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" message="Loading doctors..." />
          </div>
        ) : visibleDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleDoctors.map((doctor) => (
              <Card key={doctor.doctorId} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-20 w-20 rounded-full overflow-hidden mr-4">
                        <img 
                          src={doctor.imageURL} 
                          alt={doctor.name} 
                          className="h-full w-full object-cover" 
                          onError={(e) => { 
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=Doctor"; 
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <p className="text-primary">{doctor.role}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`h-4 w-4 ${i < Math.floor(doctor.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-1">{doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">{doctor.description}</p>
                      <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>{doctor.experience} Yrs Exp</span>
                        <span>₹{doctor.price.toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex border-t">
                    <button 
                      onClick={() => handleVideoConsultation(doctor)}
                      className="flex-1 py-3 text-center text-primary border-r hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <Video className="h-4 w-4 mr-1" /> Video Consult
                    </button>
                    <button 
                      onClick={() => handleBookAppointment(doctor)}
                      className="flex-1 py-3 text-center text-primary hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <Calendar className="h-4 w-4 mr-1" /> Book Clinic
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold">No doctors found</h2>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={resetFilters}
            >
              Reset all filters
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {visibleDoctors.length > 0 && visibleDoctors.length < allDoctors.length && (
          <div className="mt-8 text-center">
            <Button variant="outline">Load More</Button>
          </div>
        )}

        {/* Filter Dialog */}
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Doctors</DialogTitle>
              <DialogDescription>
                Refine your search with these filters
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Specialty Filter */}
              <div>
                <label className="text-sm font-medium">Specialty</label>
                <Select 
                  value={selectedSpecialty} 
                  onValueChange={setSelectedSpecialty}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Specialties</SelectItem>
                    {allSpecialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Price Range</label>
                  <span className="text-sm text-gray-600">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[1000, 5000]}
                  max={5000}
                  min={1000}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                />
              </div>
              
              {/* Rating Filter */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Minimum Rating</label>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{ratingFilter}+</span>
                  </div>
                </div>
                <Slider
                  defaultValue={[0]}
                  max={5}
                  min={0}
                  step={0.5}
                  value={[ratingFilter]}
                  onValueChange={(value) => setRatingFilter(value[0])}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
              <Button onClick={() => setIsFilterOpen(false)}>Apply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Video Consultation Modal */}
        {videoConsultationDoctor && (
          <VideoConsultation 
            doctor={videoConsultationDoctor}
            onClose={() => setVideoConsultationDoctor(null)}
          />
        )}

        {/* Appointment Booking Modal */}
        {bookAppointmentDoctor && (
          <AppointmentBooking 
            doctor={bookAppointmentDoctor}
            onClose={() => setBookAppointmentDoctor(null)}
          />
        )}
      </div>
    </Layout>
  );
};

// Helper function to get sort label
function getSortLabel(sortOption: string): string {
  switch (sortOption) {
    case 'price-asc': return 'Price: Low to High';
    case 'price-desc': return 'Price: High to Low';
    case 'rating-desc': return 'Highest Rated';
    case 'exp-desc': return 'Most Experienced';
    default: return 'Sort By';
  }
}

export default DoctorConsultation;
