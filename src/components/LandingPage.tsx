import React from 'react';
import { Search, Film, Star } from 'lucide-react';
import { Link } from 'react-router-dom';


const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to MovieSearch</h1>
      <p className="text-xl mb-8 text-gray-600">Discover your next favorite movie</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard 
          icon={<Search className="w-12 h-12 text-blue-500" />}
          title="Search"
          description="Find movies by title, actor, or director"
        />
        <Link to={"popular"}>
        <FeatureCard 
          icon={<Film className="w-12 h-12 text-green-500" />}
          title="Explore"
          description="Browse through thousands of movies"
        />
        </Link>
        <Link to={"/favorites"}>
        <FeatureCard 
          icon={<Star className="w-12 h-12 text-yellow-500" />}
          title="Favorite"
          description="Save your favorite movies for later"
        />
        </Link>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <p className="text-lg font-semibold mb-2">Ready to start?</p>
        <p className="text-gray-700">Use the search bar above to find your first movie!</p>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description}) => (
  <div 
    className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg cursor-pointer"
  >
    <div className="flex justify-center mb-4">{icon}</div>
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;