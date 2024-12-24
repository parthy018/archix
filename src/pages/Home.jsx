import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {  FiHome, FiUsers, FiEdit3 } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TestimonialSection from "../sections/TestimonialSection";
import ProjectsSection from "../sections/ProjectsSection";
import ServiceImage from "../assets/service.jpg";
import LazyLoadSection from "../sections/LazyLoadSection";
import FeedbackForm from "../sections/FeedBackForm";
const Home = () => {
  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      title: "Modern Architectural Excellence",
      subtitle: "Creating spaces that inspire",
    },
    {
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80",
      title: "Innovative Design Solutions",
      subtitle: "Where vision meets reality",
    },
    {
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80",
      title: "Sustainable Architecture",
      subtitle: "Building for tomorrow",
    },
  ];

  const services = [
    {
      icon: <FiHome className="w-12 h-12" />,
      title: "Architectural Design",
      description:
        "Innovative and functional architectural solutions tailored to your needs.",
    },
    {
      icon: <FiEdit3 className="w-12 h-12" />,
      title: "Interior Design",
      description:
        "Creating beautiful and functional interior spaces that inspire.",
    },
    {
      icon: <FiUsers className="w-12 h-12" />,
      title: "Project Management",
      description:
        "Expert management of your project from concept to completion.",
    },
    {
      icon: <FiHome className="w-12 h-12" />,
      title: "Residential Design",
      description:
        "Custom home designs that reflect your lifestyle and preferences.",
    },
  ];


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl mb-8">{slide.subtitle}</p>
                    <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                      Explore Our Work
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-20 bg-[#f0fdfa] min-h-60">
        <div className="max-w-7xl mx-auto  p-6 sm:p-12 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center"
        >
          
          <div className="md:w-1/2 flex flex-col space-y-4">
            <h3 className="text-3xl font-poppins">
              Create Architecture Solution by
            </h3>
            <h3 className="text-3xl font-host">Professional</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              perspiciatis Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Maxime, nobis amet! Quas, iure dignissimos. Voluptatem unde
              atque assumenda dolor quae.
            </p>
            <div className="w-full flex items-center justify-around space-x-4 md:space-x-0 md:justify-evenly mt-6">
              <div className="flex flex-col items-center sm:border-r-2 w-1/3">
                <h3 className="text-3xl font-bold text-[#528D86]">20+</h3>
                <p className="text-slate-500 text-center">
                  Years of Experience
                </p>
              </div>
              <div className="flex flex-col items-center sm:border-r-2 w-1/3">
                <h3 className="text-3xl font-bold text-[#528D86]">120</h3>
                <p className="text-slate-500 text-center">Project Done</p>
              </div>
              <div className="flex flex-col items-center w-1/3">
                <h3 className="text-3xl font-bold text-[#528D86]">120</h3>
                <p className="text-slate-500 text-center">Get Award</p>
              </div>
            </div>
          </div>

          {/* Second Div with Images */}
          <div className="w-1/2 mt-10 md:mt-0  relative">
            <img
              src="https://st.hzcdn.com/simgs/c9f14c3800f833ee_9-9381/home-design.jpg"
              alt="Architecture image 1"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div
              className="absolute top-[-3rem] right-[-3rem] z-[-0] w-[7rem] h-[8rem]
             bg-orange-100 opacity-50 rounded-lg"
            ></div>
          </div>
        </div>
      </section>

      <ProjectsSection />

       <LazyLoadSection  services={services} ServiceImage={ServiceImage} /> 

        <TestimonialSection />

          <FeedbackForm />
    </div>
  );
};

export default Home;
