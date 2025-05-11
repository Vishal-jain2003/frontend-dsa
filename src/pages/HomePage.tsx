



// import React, { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import {
//   ArrowRight,
//   CheckCircle,
//   Layout as LayoutIcon,
//   Code,
//   Calendar,
//   BarChart2,
// } from 'lucide-react';
// import Layout from '@/components/layout/Layout';
// import { cn } from '@/lib/utils';

// const HomePage: React.FC = () => {
//   const featuresRef = useRef<HTMLDivElement>(null);

//   // Animate elements when they come into view
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add('animate-fade-in');
//             observer.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     const elements = document.querySelectorAll('.reveal');
//     elements.forEach((el) => {
//       observer.observe(el);
//     });

//     return () => {
//       elements.forEach((el) => {
//         observer.unobserve(el);
//       });
//     };
//   }, []);

//   const scrollToFeatures = () => {
//     featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const features = [
//     {
//       title: 'Track Your Progress',
//       description: 'Keep track of every DSA problem you solve with detailed notes and classifications.',
//       icon: CheckCircle,
//       color: 'bg-blue-500/10 text-blue-500',
//     },
//     {
//       title: 'Organize Problems',
//       description: 'Categorize problems by topic, difficulty, and status for better organization.',
//       icon: LayoutIcon,
//       color: 'bg-purple-500/10 text-purple-500',
//     },
//     {
//       title: 'Similar Problems',
//       description: 'Get AI-powered recommendations for similar problems to practice and improve.',
//       icon: Code,
//       color: 'bg-green-500/10 text-green-500',
//     },
//     {
//       title: 'Maintain Streak',
//       description: 'Stay motivated with daily streaks and reminders to keep your consistency.',
//       icon: Calendar,
//       color: 'bg-orange-500/10 text-orange-500',
//     },
//     {
//       title: 'Visualize Progress',
//       description: 'See your progress over time with interactive charts and statistics.',
//       icon: BarChart2,
//       color: 'bg-red-500/10 text-red-500',
//     },
//   ];

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <section className="relative overflow-hidden py-20 md:py-32">
//         <div className="container mx-auto px-6 relative z-10">
//           <div className="max-w-3xl mx-auto text-center">
//             <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-5">
//               The Ultimate DSA Companion
//             </div>
//             <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 [text-wrap:balance]">
//               Master Data Structures & Algorithms with Structured Practice
//             </h1>
//             <p className="text-lg md:text-xl text-muted-foreground mb-10 [text-wrap:balance]">
//               Track your problem-solving journey, maintain consistency with streaks, and get AI-powered recommendations to level up your DSA skills.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link to="/signup">
//                 <Button size="lg" className="rounded-full px-8">
//                   Get Started <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//               </Link>
//               <Button size="lg" variant="outline" className="rounded-full px-8" onClick={scrollToFeatures}>
//                 Explore Features
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Background Elements */}
//         <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 transform">
//           <div className="h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
//         </div>
//         <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 transform">
//           <div className="h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section ref={featuresRef} className="py-20 md:py-32 bg-muted/30">
//         <div className="container mx-auto px-6">
//           <div className="max-w-3xl mx-auto text-center mb-16">
//             <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-5 reveal opacity-0">
//               Features
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 reveal opacity-0">
//               Everything you need to excel in DSA
//             </h2>
//             <p className="text-lg text-muted-foreground reveal opacity-0">
//               Our platform provides all the tools you need to track, organize, and improve your DSA problem-solving skills.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="group bg-card p-6 rounded-xl border shadow-sm transition-transform duration-500 transform-gpu hover:rotate-[1deg] hover:-translate-y-2 hover:shadow-lg cursor-pointer perspective-1000 reveal opacity-0"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-y-12", feature.color)}>
//                   <feature.icon className="h-6 w-6" />
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 transition-all group-hover:text-primary">{feature.title}</h3>
//                 <p className="text-muted-foreground">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 md:py-32">
//         <div className="container mx-auto px-6">
//           <div className="max-w-3xl mx-auto text-center mb-16">
//             <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-5 reveal opacity-0">
//               Testimonials
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 reveal opacity-0">
//               What our users say
//             </h2>
//             <p className="text-lg text-muted-foreground reveal opacity-0">
//               Join thousands of developers who have improved their DSA skills with our platform.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="bg-card p-8 rounded-xl border shadow-sm reveal opacity-0">
//                 <div className="flex items-center mb-6">
//                   <div className="w-12 h-12 rounded-full bg-muted"></div>
//                   <div className="ml-4">
//                     <h4 className="font-medium">User {i}</h4>
//                     <p className="text-sm text-muted-foreground">Software Engineer</p>
//                   </div>
//                 </div>
//                 <p className="text-muted-foreground">
//                   "This platform has been a game-changer for my interview preparation. The streak feature keeps me consistent, and the AI recommendations help me focus on similar problems."
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="py-20 md:py-32 bg-muted/30">
//         <div className="container mx-auto px-6">
//           <div className="max-w-3xl mx-auto text-center reveal opacity-0">
//             <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
//               Ready to level up your DSA skills?
//             </h2>
//             <p className="text-lg text-muted-foreground mb-10">
//               Join our platform today and start tracking your problem-solving journey.
//             </p>
//             <Link to="/signup">
//               <Button size="lg" className="rounded-full px-8">
//                 Get Started <ArrowRight className="ml-2 h-4 w-4" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default HomePage;


import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  CheckCircle,
  Layout as LayoutIcon,
  Code,
  Calendar,
  BarChart2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { cn } from '@/lib/utils';

const HomePage = () => {
  const featuresRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Animate elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: 'Track Your Progress',
      description: 'Keep track of every DSA problem you solve with detailed notes and classifications.',
      icon: CheckCircle,
      color: 'bg-blue-500/10 text-blue-500',
    },
    {
      title: 'Organize Problems',
      description: 'Categorize problems by topic, difficulty, and status for better organization.',
      icon: LayoutIcon,
      color: 'bg-purple-500/10 text-purple-500',
    },
    {
      title: 'Similar Problems',
      description: 'Get AI-powered recommendations for similar problems to practice and improve.',
      icon: Code,
      color: 'bg-green-500/10 text-green-500',
    },
    {
      title: 'Maintain Streak',
      description: 'Stay motivated with daily streaks and reminders to keep your consistency.',
      icon: Calendar,
      color: 'bg-orange-500/10 text-orange-500',
    },
    {
      title: 'Visualize Progress',
      description: 'See your progress over time with interactive charts and statistics.',
      icon: BarChart2,
      color: 'bg-red-500/10 text-red-500',
    },
  ];

  // Testimonial data (replace with real data and image URLs)
  const testimonials = [
      {
      name: "Vishal Jain",
      role: "Creator of AI-DSA Tracker",
      image: "https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746558046/gjkvbdpqpejrh1asyswu.jpg",
      feedback: "I’m dedicated to helping developers excel in their coding journey. This platform is a reflection of my passion for DSA.",
    },
    {
      name: "Harshit Mishra",
      role: "Aspiring Software Engineer",
      image: "https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746552448/wbzfadphbhd0hw0c489j.jpg",
      feedback: "This platform has been a game-changer for my interview preparation. The streak feature keeps me consistent, and the AI recommendations help me focus on similar problems.",
    },
    {
      "name":"Amit Jain",
      "role":"Software Engineer",
      "image":"https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746706629/nyptovhtqh3ppri9hfd9.jpg",
      "feedback":"The community aspect is great! I can discuss problems with others and learn from their approaches.",
    },
    
    {
      name: "Kush Gupta",
      role: "Backend Developer",
      image: "https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746530645/sutag3lylucznjdtxnvx.jpg",
      feedback: "The streak feature is amazing! It motivates me to practice daily, and the problem recommendations are spot on for my skill level.",
    },
     {
  "name": "Vicky Singh",
  "role": "Full Stack Developer",
  "image": "https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746554190/wxypgzpxy5trmxuuro7x.jpg",
  "feedback": "The personalized feedback after each problem is incredibly helpful. It’s like having a mentor available 24/7!"
},
{
  "name": "Umang Bishya",
  "role": "Full Stack Developer",
  "image": "https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746553618/r9nig3kezthndajjtss2.jpg",
  "feedback": "I’ve improved my coding skills dramatically using this platform. The UI is clean, and the challenges are well-structured."
},
    {
      name: "Kush Kumar",
      role: "Aspiring SDE",
      image: "https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746552835/nhtfakz4lhireef365ts.jpg",
      feedback: "I love how intuitive this platform is. It’s helped me stay organized and track my progress effectively during my coding journey.",
    },
 

  
    {
    "name": "Vasu Taunk",
    "role": "Backend Developer",
    "image": "https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746554649/euj1rxdpukgvwqlovoqg.jpg",
    "feedback": "I appreciate the variety of problems available. It keeps my practice sessions engaging and challenging."
  },
  {
    "name": "Pradeep Solanki",
    "role": "Java Developer",
    "image": "https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746558635/uol5fexaiwrg5vm1qkwt.jpg",
    "feedback": "The platform’s analytics feature is fantastic! I can see my strengths and weaknesses clearly, which helps me focus on areas that need improvement.",
  },
  

];

  // Automatically slide to the next testimonial every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const nextSlide = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  const prevSlide = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-5">
              The Ultimate DSA Companion
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 [text-wrap:balance]">
              Master Data Structures & Algorithms with Structured Practice
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 [text-wrap:balance]">
              Track your problem-solving journey, maintain consistency with streaks, and get AI-powered recommendations to level up your DSA skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="rounded-full px-8">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8" onClick={scrollToFeatures}>
                Explore Features
              </Button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 transform">
          <div className="h-96 w-96 rounded-full bg-primary/10 blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 transform">
          <div className="h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-5 reveal opacity-0">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 reveal opacity-0">
              Everything you need to excel in DSA
            </h2>
            <p className="text-lg text-muted-foreground reveal opacity-0">
              Our platform provides all the tools you need to track, organize, and improve your DSA problem-solving skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-card p-6 rounded-xl border shadow-sm transition-transform duration-500 transform-gpu hover:rotate-[1deg] hover:-translate-y-2 hover:shadow-lg cursor-pointer perspective-1000 reveal opacity-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform duration-500 group-hover:rotate-y-12", feature.color)}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 transition-all group-hover:text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Developer Info and Slider */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-muted/30 to-transparent">
        <div className="container mx-auto px-6">
          {/* Static Developer Section */}
          <div className="max-w-3xl mx-auto text-center mb-16 reveal opacity-0">
            <div className="inline-block rounded-full bg-primary/10 px-4 py-2 text-lm font-medium text-primary mb-5">
              Developer
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground dark:text-white mb-6">

            Creator of AI-DSA Tracker

{" "}
  <a
    href="https://www.linkedin.com/in/vishal-jain-b7352a364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary underline hover:text-primary/80 transition"
  >
    Vishal Jain
  </a>
</h2>
            <div className="flex justify-center mb-6">
            <img
  src="https://res.cloudinary.com/dsbbhvnoi/image/upload/v1746558931/blm41dfe9rytsm8i9gae.jpg"
  alt="Developer Name"
  className="w-40 h-40 rounded-full border-4 border-primary shadow-lg object-cover object-top"
/>


            </div>
            <p className="text-lg text-muted-foreground">
              I’m Vishal Jain, the creator of AI-DSA Tracker, dedicated to helping developers excel in their coding journey.
            </p>
          </div>

          {/* Testimonials Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16 reveal opacity-0">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-5">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground dark:text-white mb-6">
              What Our Users Say
            </h2>
            {/* className="text-3xl md:text-4xl font-bold tracking-tight text-foreground dark:text-white mb-6" */}
            <p className="text-lg text-muted-foreground">
              Join thousands of developers who have improved their DSA skills with our platform.
            </p>
          </div>

          {/* Testimonials Slider */}
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={cn(
                    "min-w-full bg-card p-8 rounded-xl border shadow-lg transition-all duration-300",
                    currentIndex === index ? "border-primary scale-100 shadow-xl shadow-primary/20" : "border-gray-700 scale-95 opacity-80"
                  )}
                >
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-18 h-14 rounded-full object-cover border-2 border-primary"
                      loading="lazy"
                    />
                    <div className="ml-4">
                     <h4 className="font-semibold text-lg text-foreground dark:text-white">{testimonial.name}</h4>

                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-base leading-relaxed">{testimonial.feedback}</p>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {/* <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary/80 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary/80 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button> */}
          </div>

          {/* Dots for Navigation */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-4 h-4 rounded-full mx-2 transition-all duration-300",
                  currentIndex === index ? "bg-primary scale-125" : "bg-gray-600 scale-100"
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center reveal opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to level up your DSA skills?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join our platform today and start tracking your problem-solving journey.
            </p>
            <Link to="/signup">
              <Button size="lg" className="rounded-full px-8">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;