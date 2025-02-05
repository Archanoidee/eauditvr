"use client";

import { Card } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/shadcn/drawer";
import { Input } from "@/components/ui/shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { FC, useState } from "react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Nickey",
    role: "Data Analysis",
    type: "Internal",
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
  {
    name: "David",
    role: "HR Admin",
    type: "External",
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
  {
    name: "Wilson",
    role: "Software Developer",
    type: "Internal",
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
  {
    name: "Mark Antony",
    role: "Data Analysis",
    type: "Internal",
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
  {
    name: "Nickey",
    role: "HR Admin",
    type: "External",
    imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
];

const TeamCard: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="p-8">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button className="mb-6">Add Team</Button>
        </DrawerTrigger>

        <DrawerContent className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Add Team</h2>
          <form>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Type
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select team type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Internal">Internal</SelectItem>
                  <SelectItem value="External">External</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input placeholder="Enter Name" />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Role
              </label>
              <Input placeholder="Enter Role" />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className="flex w-full flex-col items-center rounded-lg bg-white p-4 shadow-md"
          >
            <div className="relative h-16 w-16">
              <Image
                src={member.imageUrl}
                alt={member.name}
                className="mb-4 h-16 w-16 rounded-full border-2 border-gray-200 object-cover"
                fill
              />
            </div>
            <h2 className="text-center text-lg font-semibold">{member.name}</h2>
            <p className="text-center text-sm text-gray-500">{member.type}</p>
            <p className="text-center text-sm text-gray-500">{member.role}</p>
            <Button className="mt-4">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
