"use client";

import { Button } from "@/components/ui/shadcn/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/shadcn/avatar";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/shadcn/label";

// Define the shortenEmail function
const shortenEmail = (email: string | undefined) => {
  const [local, domain] = email?.split("@") || ["", ""]; // Default to empty strings if email is undefined
  const shortenedLocal = local.length > 10 ? `${local.slice(0, 7)}...` : local;
  return `${shortenedLocal}@${domain}`;
};

// Define the type for staff profile data
interface StaffProfile {
  id: string;
  gmail: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
  employeeId: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  address: string;
  designation: string;
  region: string;
  role: string;
  languages: string[];
  department: string;
  active: boolean;
}

// Define the type for the StaffCard props
interface StaffCardProps {
  id: string;
  profile: StaffProfile;
}

const StaffCard: React.FC<StaffCardProps> = ({ id, profile }) => {
  const router = useRouter();

  return (
    <div className="flex transform flex-col items-start rounded-lg border border-gray-200 bg-white p-6 shadow-xl transition-transform hover:scale-105 hover:shadow-2xl">
      {/* Display staff image */}
      <div className="flex items-start">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            alt={`${profile.firstName} ${profile.lastName}`}
          />
          <AvatarFallback>
            {profile.firstName?.charAt(0)}
            {profile.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Display staff name */}
      <h2 className="mb-3 text-xl font-bold text-gray-800">
        {profile.firstName} {profile.lastName}
      </h2>

      <div className="w-full bg-blue-50 p-4 text-left shadow-sm">
        <Label
          variant={profile.active ? "active" : "inactive"}
          className="rounded p-1"
        >
          {profile.active ? "Active" : "Inactive"}
        </Label>
        {/* Shortened Gmail display */}
        <p className="mt-2 flex items-center gap-2 text-sm text-gray-700">
          📧 <span title={profile.gmail}>{shortenEmail(profile.gmail)}</span>
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          📞 {profile.contactNumber}
        </p>
        <p className="flex items-center gap-2 text-sm text-gray-700">
          Role: {profile.role}
        </p>
      </div>

      <Button
        className="mt-6 w-full rounded-md bg-blue-500 py-2 text-white transition-colors duration-300 ease-in-out hover:bg-blue-600"
        onClick={() => router.push(`/staff/details/${id}`)}
      >
        View details
      </Button>
    </div>
  );
};

export default StaffCard;
