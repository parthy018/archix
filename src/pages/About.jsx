
import { Link } from "react-router-dom";
import { Building2, Calendar, ChevronRight, GraduationCap, Briefcase, Compass, Ruler, PenTool, HomeIcon, Users } from "lucide-react";

const About = () => {
  const timelineEvents = [
    {
      year: "2018",
      title: "Master's in Architecture",
      description: "Graduated with honors from Harvard Graduate School of Design",
      icon: <GraduationCap className="w-6 h-6 text-architecture-400" />
    },
    {
      year: "2019",
      title: "Junior Architect",
      description: "Started career at Foster + Partners on sustainable urban projects",
      icon: <Briefcase className="w-6 h-6 text-architecture-400" />
    },
    {
      year: "2021",
      title: "Senior Architect",
      description: "Led design team for award-winning commercial spaces",
      icon: <Building2 className="w-6 h-6 text-architecture-400" />
    },
    {
      year: "2023",
      title: "Founding Partner",
      description: "Established Moderna Architects with a focus on innovative solutions",
      icon: <Calendar className="w-6 h-6 text-architecture-400" />
    }
  ];

  const services = [
    {
      title: "Residential Design",
      description: "Creating beautiful, functional living spaces that reflect your personal style and needs.",
      icon: <HomeIcon className="w-8 h-8 text-architecture-600" />
    },
    {
      title: "Commercial Architecture",
      description: "Designing impactful workspaces that enhance productivity and brand expression.",
      icon: <Building2 className="w-8 h-8 text-architecture-600" />
    },
    {
      title: "Urban Planning",
      description: "Developing sustainable urban solutions that create harmony between cities and nature.",
      icon: <Compass className="w-8 h-8 text-architecture-600" />
    },
    {
      title: "Interior Design",
      description: "Crafting interiors that combine aesthetics, functionality, and your unique vision.",
      icon: <PenTool className="w-8 h-8 text-architecture-600" />
    },
    {
      title: "Architectural Consulting",
      description: "Expert guidance on materials, technologies, and sustainable building practices.",
      icon: <Ruler className="w-8 h-8 text-architecture-600" />
    },
    {
      title: "Community Projects",
      description: "Creating shared spaces that foster connection and enhance community well-being.",
      icon: <Users className="w-8 h-8 text-architecture-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full bg-sky-100 py-12 md:py-24">
        <div className="max-w-7xl  px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="relative w-full max-w-sm mx-auto md:mx-0">
              <div className="aspect-square rounded-2xl overflow-hidden bg-architecture-100 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2670&auto=format&fit=crop" 
                  alt="Jane Smith, Principal Architect" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-architecture-200 rounded-full shadow-md"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-architecture-300/50 rounded-full shadow-md"></div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-architecture-100 bg-architecture-600 rounded-full">
                Principal Architect
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Jane Smith</h1>
              <p className="text-xl text-gray-600 mb-6 max-w-2xl">
                With over 5 years of experience in creating spaces that inspire, I bring vision, precision, and sustainability to every project.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Link to="/projects" className="inline-flex items-center px-4 py-2 border border-architecture-400 text-architecture-700 rounded-md hover:bg-architecture-50 transition-colors">
                  <span>View Projects</span>
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Link>
                <Link to="/contact" className="inline-flex items-center px-4 py-2 bg-architecture-700 text-white rounded-md hover:bg-architecture-800 transition-colors">
                  <span>Contact Me</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Professional Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              My path in architecture has been shaped by education, mentorship, and hands-on experience with innovative projects.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line connecting timeline points */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-architecture-700"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center md:items-start gap-4`}
                >
                  {/* Timeline point */}
                  <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-architecture-700 shadow-md md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-architecture-400"></div>
                  </div>
                  
                  {/* Content box */}
                  <div className={`relative w-full md:w-[calc(50%-2rem)] p-6 bg-white rounded-lg shadow-md
                                  border-l-4 border-architecture-800 transition-all duration-300 hover:shadow-lg
                                  ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                                  style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="absolute top-6 -left-3 hidden md:block">
                      <div className={`w-3 h-0.5 ${index % 2 === 0 ? 'bg-transparent' : 'bg-architecture-300'}`}></div>
                    </div>
                    <div className="absolute top-6 -right-3 hidden md:block">
                      <div className={`w-3 h-0.5 ${index % 2 === 0 ? 'bg-architecture-300' : 'bg-transparent'}`}></div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-2">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-architecture-100 flex items-center justify-center">
                        {event.icon}
                      </span>
                      <span className="px-3 py-1 text-sm font-semibold text-architecture-800 bg-architecture-100 rounded-full">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive architectural solutions tailored to your specific needs and vision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card hover:translate-y-[-4px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-16 md:py-20 bg-architecture-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Let's discuss how our expertise in architecture and design can bring your vision to life.
            </p>
            <div className="inline-block">
              <Link 
                to="/" 
                className="inline-flex items-center px-6 py-3 bg-architecture-700 text-white rounded-md hover:bg-architecture-800 transition-colors text-lg font-medium"
              >
                <span>Schedule a Consultation</span>
                <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
