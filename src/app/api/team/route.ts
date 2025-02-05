import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Handle POST request: Add new team
export async function POST(req: NextRequest) {
  try {
    const {
      id,
      name,
     role,
    } = await req.json();
    // Dropdown data (category, team stage, and team proposal status options)
    const dropdown = {
          role: [
            { Key: "AD", Value: "Admin" },
            { Key: "ED", Value: "Editor" },
            { Key: "ST", Value: "Staff" },
            { Key: "HR", Value: "Hr" },
            { Key: "MN", Value: "Manager" },
            { Key: "OT", Value: "others" },
          ],
        };
    // team data to store inside the `team` field
    const teamData = {
      id,
      name,
    role,
    };
    // Create a new team record
    const team = await prisma.team.create({
      data: {
        team: teamData, // Store all team details in the `team` JSON field
        dropdown,            // Store dropdown data in the `dropdown` JSON field
      },
    });
    return NextResponse.json(
      { message: "team added successfully", team },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding team:", error);
    return NextResponse.json({ error: "Failed to add team" }, { status: 500 });
  }
}
 // Handle GET request: Fetch all staff names
 export async function GET() {
   try {
     // Fetch staff data from the database
     const staff = await prisma.staff.findMany({
       select: {
         profile: true, // Only select the profile field
       },
     });
     // Define the type for profile
     type Profile = {
       firstName: string;
       lastName: string;
     };
 
     // Extract firstName and lastName from profile JSON
     const staffNames = staff.map((member) => {
       const profile = member.profile as Profile;
       return {
         firstName: profile?.firstName || "",
         lastName: profile?.lastName || "",
       };
     });
     return NextResponse.json({ success: true, data: staffNames });
   } catch (error) {
     console.error("Error fetching staff names:", error);
     return NextResponse.json({ error: "Failed to fetch staff names" }, { status: 500 });
   }
 }
 