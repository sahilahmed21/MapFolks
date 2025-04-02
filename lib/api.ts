// This is a mock API implementation
// In a real application, this would be replaced with actual API calls

import { profiles as initialProfiles } from "@/lib/data"

// Simulate API latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// In-memory store for profiles
const profiles = [...initialProfiles]

export async function getProfiles() {
  await delay(800) // Simulate network delay
  return [...profiles]
}

export async function getProfileById(id) {
  await delay(600)
  const profile = profiles.find((p) => p.id === id)

  if (!profile) {
    throw new Error(`Profile with ID ${id} not found`)
  }

  return { ...profile }
}

export async function addProfile(profileData) {
  await delay(1000)

  const newProfile = {
    id: Date.now().toString(),
    ...profileData,
    createdAt: new Date().toISOString(),
  }

  profiles.push(newProfile)
  return newProfile
}

export async function updateProfile(id, profileData) {
  await delay(800)

  const index = profiles.findIndex((p) => p.id === id)

  if (index === -1) {
    throw new Error(`Profile with ID ${id} not found`)
  }

  const updatedProfile = {
    ...profiles[index],
    ...profileData,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString(),
  }

  profiles[index] = updatedProfile
  return updatedProfile
}

export async function deleteProfile(id) {
  await delay(600)

  const index = profiles.findIndex((p) => p.id === id)

  if (index === -1) {
    throw new Error(`Profile with ID ${id} not found`)
  }

  profiles.splice(index, 1)
  return { success: true }
}

