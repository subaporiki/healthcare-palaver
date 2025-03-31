
import React, { useState, useEffect } from 'react';
import { SearchIcon, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import LoadingSpinner from '@/components/LoadingSpinner';
import { BloodBank } from '@/types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Loader } from '@googlemaps/js-api-loader';

// Mock blood bank data
const mockBloodBanks: BloodBank[] = [
  {
    id: '1',
    name: 'Red Cross Blood Bank',
    location: 'Chennai',
    address: '23 Main Road, Adyar, Chennai - 600020',
    phone: '+91 4442138113',
    bloodTypes: [
      { type: 'A+', quantity: 50, lastUpdated: new Date() },
      { type: 'O+', quantity: 30, lastUpdated: new Date() },
      { type: 'B+', quantity: 20, lastUpdated: new Date() },
      { type: 'AB+', quantity: 15, lastUpdated: new Date() },
      { type: 'A-', quantity: 10, lastUpdated: new Date() },
      { type: 'O-', quantity: 12, lastUpdated: new Date() },
      { type: 'B-', quantity: 8, lastUpdated: new Date() },
      { type: 'AB-', quantity: 5, lastUpdated: new Date() },
    ],
    coordinates: { lat: 13.0108, lng: 80.2339 }
  },
  {
    id: '2',
    name: 'Apollo Blood Donation Center',
    location: 'Chennai',
    address: '21 Greams Lane, Thousand Lights, Chennai - 600006',
    phone: '+91 4428294397',
    bloodTypes: [
      { type: 'A+', quantity: 35, lastUpdated: new Date() },
      { type: 'O+', quantity: 45, lastUpdated: new Date() },
      { type: 'B+', quantity: 25, lastUpdated: new Date() },
      { type: 'AB+', quantity: 10, lastUpdated: new Date() },
      { type: 'A-', quantity: 5, lastUpdated: new Date() },
      { type: 'O-', quantity: 15, lastUpdated: new Date() },
      { type: 'B-', quantity: 7, lastUpdated: new Date() },
      { type: 'AB-', quantity: 3, lastUpdated: new Date() },
    ],
    coordinates: { lat: 13.0569, lng: 80.2426 }
  },
  {
    id: '3',
    name: 'Government General Hospital Blood Bank',
    location: 'Chennai',
    address: 'EVR Periyar Salai, Park Town, Chennai - 600003',
    phone: '+91 4425302000',
    bloodTypes: [
      { type: 'A+', quantity: 60, lastUpdated: new Date() },
      { type: 'O+', quantity: 55, lastUpdated: new Date() },
      { type: 'B+', quantity: 45, lastUpdated: new Date() },
      { type: 'AB+', quantity: 20, lastUpdated: new Date() },
      { type: 'A-', quantity: 15, lastUpdated: new Date() },
      { type: 'O-', quantity: 20, lastUpdated: new Date() },
      { type: 'B-', quantity: 15, lastUpdated: new Date() },
      { type: 'AB-', quantity: 10, lastUpdated: new Date() },
    ],
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: '4',
    name: 'Madurai Blood Donation Society',
    location: 'Madurai',
    address: '45 East Masi Street, Madurai - 625001',
    phone: '+91 4522345678',
    bloodTypes: [
      { type: 'A+', quantity: 40, lastUpdated: new Date() },
      { type: 'O+', quantity: 35, lastUpdated: new Date() },
      { type: 'B+', quantity: 30, lastUpdated: new Date() },
      { type: 'AB+', quantity: 12, lastUpdated: new Date() },
      { type: 'A-', quantity: 8, lastUpdated: new Date() },
      { type: 'O-', quantity: 10, lastUpdated: new Date() },
      { type: 'B-', quantity: 6, lastUpdated: new Date() },
      { type: 'AB-', quantity: 4, lastUpdated: new Date() },
    ],
    coordinates: { lat: 9.9252, lng: 78.1198 }
  },
  {
    id: '5',
    name: 'Coimbatore Medical College Blood Bank',
    location: 'Coimbatore',
    address: 'Trichy Road, Coimbatore - 641018',
    phone: '+91 4222301393',
    bloodTypes: [
      { type: 'A+', quantity: 55, lastUpdated: new Date() },
      { type: 'O+', quantity: 50, lastUpdated: new Date() },
      { type: 'B+', quantity: 40, lastUpdated: new Date() },
      { type: 'AB+', quantity: 18, lastUpdated: new Date() },
      { type: 'A-', quantity: 12, lastUpdated: new Date() },
      { type: 'O-', quantity: 14, lastUpdated: new Date() },
      { type: 'B-', quantity: 10, lastUpdated: new Date() },
      { type: 'AB-', quantity: 6, lastUpdated: new Date() },
    ],
    coordinates: { lat: 11.0168, lng: 76.9558 }
  },
  {
    id: '6',
    name: 'Salem Government Hospital Blood Bank',
    location: 'Salem',
    address: 'Shevapet, Salem - 636002',
    phone: '+91 4272529855',
    bloodTypes: [
      { type: 'A+', quantity: 30, lastUpdated: new Date() },
      { type: 'O+', quantity: 35, lastUpdated: new Date() },
      { type: 'B+', quantity: 25, lastUpdated: new Date() },
      { type: 'AB+', quantity: 10, lastUpdated: new Date() },
      { type: 'A-', quantity: 8, lastUpdated: new Date() },
      { type: 'O-', quantity: 12, lastUpdated: new Date() },
      { type: 'B-', quantity: 7, lastUpdated: new Date() },
      { type: 'AB-', quantity: 4, lastUpdated: new Date() },
    ],
    coordinates: { lat: 11.6643, lng: 78.1460 }
  },
  {
    id: '7',
    name: 'Trichy Blood Donors Association',
    location: 'Trichy',
    address: 'Thillai Nagar, Trichy - 620018',
    phone: '+91 4312765432',
    bloodTypes: [
      { type: 'A+', quantity: 25, lastUpdated: new Date() },
      { type: 'O+', quantity: 40, lastUpdated: new Date() },
      { type: 'B+', quantity: 35, lastUpdated: new Date() },
      { type: 'AB+', quantity: 15, lastUpdated: new Date() },
      { type: 'A-', quantity: 7, lastUpdated: new Date() },
      { type: 'O-', quantity: 9, lastUpdated: new Date() },
      { type: 'B-', quantity: 8, lastUpdated: new Date() },
      { type: 'AB-', quantity: 3, lastUpdated: new Date() },
    ],
    coordinates: { lat: 10.7905, lng: 78.7047 }
  }
];

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const locations = ['Chennai', 'Madurai', 'Coimbatore', 'Salem', 'Trichy'];

const BloodSeeking = () => {
  const [bloodTypeFilter, setBloodTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [bloodBanks, setBloodBanks] = useState<BloodBank[]>([]);
  const [filteredBloodBanks, setFilteredBloodBanks] = useState<BloodBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const { toast } = useToast();
  const mapRef = React.useRef(null);

  // Initialize map with Google Maps API
  useEffect(() => {
    // For this demo, we'll use the mock data instead of Firestore
    setBloodBanks(mockBloodBanks);
    setFilteredBloodBanks(mockBloodBanks);
    setLoading(false);

    // Load Google Maps
    const loader = new Loader({
      apiKey: "AIzaSyD6g4q9bDSlXZ_JDhk452dEZYzO_xFRaWc",
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        // Center map on India
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 13.0827, lng: 80.2707 }, // Chennai
          zoom: 10,
          mapTypeControl: false,
        });
        
        setMap(mapInstance);
        setIsMapLoaded(true);
        
        // Add markers for all blood banks
        addMarkersToMap(mockBloodBanks, mapInstance);
      }
    }).catch(err => {
      console.error("Error loading Google Maps:", err);
      toast({
        title: "Failed to load map",
        description: "Could not load the Google Maps interface.",
        variant: "destructive"
      });
    });
  }, []);

  // Add markers to map
  const addMarkersToMap = (bloodBanks: BloodBank[], mapInstance: google.maps.Map) => {
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: google.maps.Marker[] = [];
    
    bloodBanks.forEach(bank => {
      const marker = new google.maps.Marker({
        position: bank.coordinates,
        map: mapInstance,
        title: bank.name,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        }
      });
      
      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 5px;">
            <h3 style="font-weight: bold; margin-bottom: 5px;">${bank.name}</h3>
            <p style="margin: 2px 0;">${bank.address}</p>
            <p style="margin: 2px 0;">${bank.phone}</p>
          </div>
        `
      });
      
      marker.addListener('click', () => {
        infoWindow.open(mapInstance, marker);
      });
      
      newMarkers.push(marker);
    });
    
    setMarkers(newMarkers);
    
    // Fit bounds if there are markers
    if (newMarkers.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition()!);
      });
      mapInstance.fitBounds(bounds);
      
      // Adjust zoom level for single marker
      if (newMarkers.length === 1) {
        mapInstance.setZoom(15);
      }
    }
  };

  // Filter blood banks based on search criteria
  const handleSearch = () => {
    let filtered = [...bloodBanks];
    
    if (bloodTypeFilter) {
      filtered = filtered.filter(bank => 
        bank.bloodTypes.some(bt => 
          bt.type === bloodTypeFilter && bt.quantity > 0
        )
      );
    }
    
    if (locationFilter) {
      filtered = filtered.filter(bank => 
        bank.location.toLowerCase() === locationFilter.toLowerCase()
      );
    }
    
    setFilteredBloodBanks(filtered);
    
    // Update map markers
    if (map && isMapLoaded) {
      addMarkersToMap(filtered, map);
    }
    
    if (filtered.length === 0) {
      toast({
        title: "No results found",
        description: "Try different search criteria.",
      });
    } else {
      toast({
        title: `Found ${filtered.length} blood banks`,
        description: bloodTypeFilter ? `With ${bloodTypeFilter} blood type available` : undefined,
      });
    }
  };

  const clearFilters = () => {
    setBloodTypeFilter('');
    setLocationFilter('');
    setFilteredBloodBanks(bloodBanks);
    
    // Reset map view
    if (map && isMapLoaded) {
      addMarkersToMap(bloodBanks, map);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Emergency Blood Seeking</h1>
        <p className="text-gray-600 mb-8">
          Find blood donors and blood banks near you during emergencies.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Search Blood Banks</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Type
                    </label>
                    <select
                      value={bloodTypeFilter}
                      onChange={(e) => setBloodTypeFilter(e.target.value)}
                      className="w-full rounded-md border border-gray-300 p-2"
                    >
                      <option value="">All Blood Types</option>
                      {bloodTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
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
                  
                  <div className="flex space-x-2">
                    <Button onClick={handleSearch} className="flex-1">
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear
                    </Button>
                  </div>
                </div>
                
                <hr className="my-6" />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Emergency Contact</h3>
                  <div className="bg-red-50 p-3 rounded-md">
                    <p className="text-red-800 font-medium">Blood Bank Helpline</p>
                    <p className="text-red-800">1800-123-456789</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="map">
              <TabsList className="w-full grid grid-cols-2 mb-4">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="map" className="m-0">
                <div className="h-[600px] border rounded-md overflow-hidden">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <LoadingSpinner size="lg" message="Loading map..." />
                    </div>
                  ) : (
                    <div ref={mapRef} className="h-full w-full"></div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="m-0">
                {loading ? (
                  <div className="flex justify-center py-20">
                    <LoadingSpinner size="lg" message="Loading blood banks..." />
                  </div>
                ) : filteredBloodBanks.length > 0 ? (
                  <div className="space-y-4">
                    {filteredBloodBanks.map((bank) => (
                      <Card key={bank.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg">{bank.name}</h3>
                                <p className="text-gray-500 flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {bank.location}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">{bank.address}</p>
                                <p className="text-sm text-gray-600">{bank.phone}</p>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="font-medium text-sm mb-2">Available Blood Types</h4>
                              <div className="flex flex-wrap gap-2">
                                {bank.bloodTypes
                                  .filter(bt => bt.quantity > 0)
                                  .map((bt) => (
                                    <div 
                                      key={bt.type} 
                                      className={`px-2 py-1 text-xs rounded-full 
                                        ${bt.type === bloodTypeFilter 
                                          ? 'bg-red-500 text-white' 
                                          : 'bg-red-100 text-red-800'}`}
                                    >
                                      {bt.type} ({bt.quantity} units)
                                    </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex border-t">
                            <Button 
                              variant="ghost" 
                              className="flex-1 py-3"
                              onClick={() => window.open(`tel:${bank.phone}`)}
                            >
                              Call
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="flex-1 py-3"
                              onClick={() => {
                                if (map) {
                                  map.setCenter(bank.coordinates);
                                  map.setZoom(15);
                                  document.querySelector('[value="map"]')?.dispatchEvent(new Event('click'));
                                }
                              }}
                            >
                              View on Map
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h2 className="mt-4 text-xl font-semibold">No blood banks found</h2>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BloodSeeking;
