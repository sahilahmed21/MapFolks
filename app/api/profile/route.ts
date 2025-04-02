import { NextRequest, NextResponse } from 'next/server';
import { profiles as currentProfiles } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import fs from 'fs';
import path from 'path';

// Define the expected structure of the incoming profile data
interface IncomingProfile {
    name?: string;
    title?: string;
    location?: string;
    email?: string;
    phone?: string;
    description?: string;
    status?: string;
    interests?: string[];
    avatar?: string;
    experience?: { title: string; company: string; period: string }[];
    education?: { degree: string; institution: string; period: string }[];
}

export async function POST(req: NextRequest) {
    try {
        const body: IncomingProfile = await req.json();

        // Generate a unique ID for the new profile
        const id = uuidv4();

        // Create the new profile object
        const newProfile = {
            id,
            ...body,
        };

        // Add the new profile to the existing profiles array
        const updatedProfiles = [...currentProfiles, newProfile];

        // Determine the path to your data.ts file
        const dataFilePath = path.join(process.cwd(), 'lib', 'data.ts');

        // Construct the content to write back to the file
        const fileContent = `export const profiles = ${JSON.stringify(updatedProfiles, null, 2)};\n\nexport default profiles;`;

        // Write the updated data back to the data.ts file
        // **Warning: Writing directly to a file in a Next.js app is generally not recommended for production.**
        // Consider using a database instead.
        fs.writeFileSync(dataFilePath, fileContent, 'utf-8');

        return NextResponse.json({ message: 'Profile added successfully', id: newProfile.id }, { status: 201 });
    } catch (error) {
        console.error('Error adding profile:', error);
        return NextResponse.json({ message: 'Failed to add profile' }, { status: 500 });
    }
}