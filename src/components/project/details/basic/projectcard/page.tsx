"use client"; // Enables React's client-side rendering.

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Project {
  id: string;
  name: string;
  owner: string;
  manager: string;
  client: string;
  category: string;
  projectproposalstatus: string;
  projectStage: string;
  worknumber: string;
  startDate: string;
  endDate: string;
  description: string;
  title: string;
  address: string;
}

const ProjectCard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<{ projects: Project[] }>("/api/projectcardapi");
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on name OR client
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase()) // Added client filter
  );

  if (!projects || projects.length === 0) {
    return <div className="text-center text-gray-500">No projects available.</div>;
  }

  return (
    <div className="px-6 pb-6">
      {/* Search bar */}
      <div className="flex justify-start mb-6">
        <input
          type="text"
          className="border border-gray-300 rounded-lg p-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search projects by name or client..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Project list */}
      <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6 gap-12">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg border border-gray-300 dark:border-gray-700 border-dashed p-6 shadow-xl flex flex-col items-center justify-between hover:scale-105 hover:shadow-2xl transition-transform"
            >
              <Avatar className="w-16 h-16 mb-4">
                <AvatarImage
                  src="https://allnvysbhq.cloudimg.io/v7/www.projectsmart.co.uk/img/project.png"
                  alt={`Avatar for ${project.name}`}
                />
                <AvatarFallback>
                  {project.name?.charAt(0)}
                  {project.name?.charAt(1)}
                </AvatarFallback>
              </Avatar>

              <div className="w-full text-center mb-4">
                <div className="bg-blue-50 p-4 shadow-sm rounded-lg mb-4">
                  <p className="text-sm text-gray-700 text-left">
                    <strong>Name:</strong> {project.name}
                  </p>
                  <p className="text-sm text-gray-700 text-left">
                    <strong>StartDate:</strong> {project.startDate}
                  </p>
                  <p className="text-sm text-gray-700 text-left">
                    <strong>EndDate:</strong> {project.endDate}
                  </p>
                  <p className="text-sm text-gray-700 text-left">
                    <strong>Client:</strong> {project.client}
                  </p>
                  <p className="text-sm text-gray-700 text-left">
                    <strong>Stage:</strong> {project.projectStage}
                  </p>
                </div>
              </div>
              <Button
                className="bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 ease-in-out"
                onClick={() => router.push(`/project/details/projectprofile/${project.id}`)}
              >
                View details
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No projects match your search query.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
