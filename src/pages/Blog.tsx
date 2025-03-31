
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 Tips for Managing Diabetes Naturally",
      excerpt: "Manage your diabetes effectively with these natural lifestyle changes that complement medical treatment.",
      image: "https://img.freepik.com/free-photo/doctor-measuring-patient-blood-pressure_23-2148525307.jpg?size=626&ext=jpg&uid=R43265025&ga=GA1.2.1270494282.1645063938",
      author: "Dr. Anand Kumar",
      date: "April 12, 2023",
      category: "Diabetes Care"
    },
    {
      id: 2,
      title: "Understanding Blood Pressure Readings",
      excerpt: "Learn how to interpret your blood pressure readings and what they mean for your overall health.",
      image: "https://img.freepik.com/free-photo/doctor-patient-measuring-blood-pressure_23-2148526087.jpg?size=626&ext=jpg&uid=R43265025&ga=GA1.2.1270494282.1645063938",
      author: "Dr. Meera Sharma",
      date: "March 25, 2023",
      category: "Heart Health"
    },
    {
      id: 3,
      title: "The Importance of Regular Health Check-ups",
      excerpt: "Regular health screenings can detect problems before they start or when chances for treatment are better.",
      image: "https://img.freepik.com/free-photo/doctor-examining-patient_23-2148526079.jpg?size=626&ext=jpg&uid=R43265025&ga=GA1.2.1270494282.1645063938",
      author: "Dr. Rajesh Patel",
      date: "February 18, 2023",
      category: "Preventive Care"
    },
    {
      id: 4,
      title: "Mental Health During the Pandemic",
      excerpt: "Strategies to maintain your mental health and well-being during challenging times and health crises.",
      image: "https://img.freepik.com/free-photo/woman-suffering-from-depression_23-2148742228.jpg?size=626&ext=jpg&uid=R43265025&ga=GA1.2.1270494282.1645063938",
      author: "Dr. Priya Desai",
      date: "January 30, 2023",
      category: "Mental Health"
    },
    {
      id: 5,
      title: "Benefits of Telemedicine in Modern Healthcare",
      excerpt: "Discover how virtual consultations are transforming the healthcare industry and improving patient care.",
      image: "https://img.freepik.com/free-photo/doctor-laptop-remote-consultation-desk_23-2149077877.jpg?size=626&ext=jpg&uid=R43265025&ga=GA1.2.1270494282.1645063938",
      author: "Dr. Karthik Venkat",
      date: "January 15, 2023",
      category: "Telemedicine"
    },
    {
      id: 6,
      title: "Essential Vaccinations for Every Age Group",
      excerpt: "A comprehensive guide to vaccinations recommended for infants, children, teens, adults, and seniors.",
      image: "https://img.freepik.com/free-photo/nurse-preparing-vaccination-patient_23-2148504939.jpg?size=626&ext=jpg&uid=R43265025&ga=GA1.2.1270494282.1645063938",
      author: "Dr. Nisha Singh",
      date: "December 12, 2022",
      category: "Immunization"
    },
  ];

  const categories = [
    "Diabetes Care",
    "Heart Health",
    "Preventive Care",
    "Mental Health",
    "Telemedicine",
    "Immunization",
    "Nutrition",
    "Fitness",
    "Women's Health",
    "Men's Health",
    "Pediatrics",
  ];

  const recentPosts = [
    "The Link Between Sleep and Heart Health",
    "Nutrition Tips for a Healthy Pregnancy",
    "Understanding Cholesterol Numbers",
    "Effective Ways to Boost Your Immunity",
    "Managing Stress in a Busy World",
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Blog</h1>
        <p className="text-gray-600 mb-8">
          Expert advice, tips, and insights on health and wellness
        </p>

        {/* Featured Post */}
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img
                  src="https://img.freepik.com/free-photo/medical-banner-with-doctor-stethoscope_23-2149611240.jpg?size=626&ext=jpg&uid=R43265025&ga=GA1.2.1270494282.1645063938"
                  alt="Featured post about healthcare trends"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">
                    Featured
                  </span>
                  <h2 className="text-2xl font-bold mt-2 mb-2">Healthcare Trends to Watch in 2023</h2>
                  <p className="text-gray-600">
                    Explore the emerging trends shaping the future of healthcare, from AI-driven diagnostics to
                    personalized medicine. Learn how these innovations are transforming patient care and offering new hope for better outcomes.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <User className="mr-1 h-4 w-4" />
                    Dr. Suresh Babu
                    <Calendar className="ml-4 mr-1 h-4 w-4" />
                    May 8, 2023
                  </div>
                  <Button>
                    Read Full Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {post.category}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      <span className="flex items-center">
                        <User className="mr-1 h-3 w-3" /> {post.author} • {post.date}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read more
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline">Load More Articles</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Categories */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors text-gray-800 text-xs font-medium px-2.5 py-1 rounded"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recentPosts.map((post, index) => (
                    <li key={index}>
                      <a href="#" className="hover:text-primary transition-colors block line-clamp-1">
                        {post}
                      </a>
                      <div className="text-xs text-gray-500 mt-1">May {index + 1}, 2023</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Subscribe */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Newsletter</CardTitle>
                <CardDescription>Stay updated with our latest health tips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Enter your email" type="email" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
