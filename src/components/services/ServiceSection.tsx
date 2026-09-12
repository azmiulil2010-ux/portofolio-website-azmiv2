import React from "react";
import { FiCode, FiLayers, FiPenTool, FiSmartphone } from "react-icons/fi";
import Header from "@/components/general/Header";
import ServiceCard from "./ServiceCard";

export default function ServiceSection() {
  return (
    <section>
      {/* Header */}
      <Header title="My Services" />
      <div className="w-[90%] sm:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2
            xl:grid-cols-4 gap-20"
      >
        <div data-aos="fade-right">  
        <ServiceCard
          name="UI and UX"
          icon={FiPenTool}
          description="Designing instuitive interfaces and seamless user experiences."
        />
        </div>
        <div data-aos="fade-right"data-aos-delay="100">
        <ServiceCard
          name="Web and Mobile App"
          icon={FiSmartphone}
          description="Developing responsive and user-friendly web and mobile applications."
        />
        </div>
        <div data-aos="fade-right"data-aos-delay="200">
        <ServiceCard
          name="Design and Creative"
          icon={FiLayers}
          description="Creating visually appealing designs and creative solutions."
        />
        </div>
        <div data-aos="fade-right"data-aos-delay="300">
        <ServiceCard
          name="Development"
          icon={FiCode}
          description="Full-stack development with modern frameworks and best practices."
        />
        </div>
      </div>
    </section>
  );
}
