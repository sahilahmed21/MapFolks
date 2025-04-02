"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"

interface Profile {
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

export default function ProfileForm({ profile = {}, onSubmit }: { profile?: Profile; onSubmit: (data: Profile) => void }) {
  const [formData, setFormData] = useState<Profile>({
    name: profile.name || "",
    title: profile.title || "",
    location: profile.location || "",
    email: profile.email || "",
    phone: profile.phone || "",
    description: profile.description || "",
    status: profile.status || "Active",
    interests: profile.interests ? profile.interests.join(", ") : "",
    avatar: profile.avatar || "",
    experience: profile.experience || [
      { title: "", company: "", period: "" },
      { title: "", company: "", period: "" },
    ],
    education: profile.education || [{ degree: "", institution: "", period: "" }],
  })

  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>({})
  const [activeTab, setActiveTab] = useState("basic")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...formData.experience]
    newExperience[index] = { ...newExperience[index], [field]: value }
    setFormData((prev) => ({ ...prev, experience: newExperience }))
  }

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setFormData((prev) => ({ ...prev, education: newEducation }))
  }

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", period: "" }],
    }))
  }

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", period: "" }],
    }))
  }

  const removeExperience = (index) => {
    const newExperience = [...formData.experience]
    newExperience.splice(index, 1)
    setFormData((prev) => ({ ...prev, experience: newExperience }))
  }

  const removeEducation = (index) => {
    const newEducation = [...formData.education]
    newEducation.splice(index, 1)
    setFormData((prev) => ({ ...prev, education: newEducation }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.title.trim()) newErrors.title = "Title is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      // Convert interests string back to array
      const interests = formData.interests
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== "")

      // Filter out empty experience and education entries
      const experience = formData.experience.filter(
        (exp) => exp.title.trim() !== "" || exp.company.trim() !== "" || exp.period.trim() !== "",
      )

      const education = formData.education.filter(
        (edu) => edu.degree.trim() !== "" || edu.institution.trim() !== "" || edu.period.trim() !== "",
      )

      onSubmit({ ...formData, interests, experience, education })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4 bg-custom-secondary">
          <TabsTrigger
            value="basic"
            className="data-[state=active]:bg-custom-primary data-[state=active]:text-custom-background"
          >
            Basic Info
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="data-[state=active]:bg-custom-primary data-[state=active]:text-custom-background"
          >
            Experience
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            className="data-[state=active]:bg-custom-primary data-[state=active]:text-custom-background"
          >
            Additional
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-custom-primary">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`border-custom-secondary focus-visible:ring-custom-primary ${errors.name ? "border-destructive" : ""}`}
              />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="title" className="text-custom-primary">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`border-custom-secondary focus-visible:ring-custom-primary ${errors.title ? "border-destructive" : ""}`}
              />
              {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-custom-primary">
              Location <span className="text-destructive">*</span>
            </Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`border-custom-secondary focus-visible:ring-custom-primary ${errors.location ? "border-destructive" : ""}`}
            />
            {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-custom-primary">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`border-custom-secondary focus-visible:ring-custom-primary ${errors.email ? "border-destructive" : ""}`}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-custom-primary">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`border-custom-secondary focus-visible:ring-custom-primary ${errors.phone ? "border-destructive" : ""}`}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-custom-primary">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`border-custom-secondary focus-visible:ring-custom-primary ${errors.description ? "border-destructive" : ""}`}
              rows={4}
            />
            {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="status" className="text-custom-primary">
                Status
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status-switch"
                  checked={formData.status === "Active"}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, status: checked ? "Active" : "Inactive" }))
                  }
                  className="data-[state=checked]:bg-custom-accent"
                />
                <Label htmlFor="status-switch" className="text-sm">
                  {formData.status === "Active" ? "Active" : "Inactive"}
                </Label>
              </div>
            </div>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger className="border-custom-secondary focus:ring-custom-primary">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-custom-background border-custom-secondary">
                <SelectItem value="Active" className="focus:bg-custom-accent focus:text-foreground">
                  Active
                </SelectItem>
                <SelectItem value="Inactive" className="focus:bg-custom-accent focus:text-foreground">
                  Inactive
                </SelectItem>
                <SelectItem value="Pending" className="focus:bg-custom-accent focus:text-foreground">
                  Pending
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar" className="text-custom-primary">
              Avatar URL
            </Label>
            <Input
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
              className="border-custom-secondary focus-visible:ring-custom-primary"
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("experience")}
              className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
            >
              Next: Experience
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="experience" className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-custom-primary">Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-md relative border-custom-secondary">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeExperience(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <Label htmlFor={`exp-title-${index}`} className="text-custom-primary">
                    Title
                  </Label>
                  <Input
                    id={`exp-title-${index}`}
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, "title", e.target.value)}
                    className="border-custom-secondary focus-visible:ring-custom-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-company-${index}`} className="text-custom-primary">
                    Company
                  </Label>
                  <Input
                    id={`exp-company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                    className="border-custom-secondary focus-visible:ring-custom-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`exp-period-${index}`} className="text-custom-primary">
                    Period
                  </Label>
                  <Input
                    id={`exp-period-${index}`}
                    value={exp.period}
                    onChange={(e) => handleExperienceChange(index, "period", e.target.value)}
                    placeholder="e.g. 2020 - Present"
                    className="border-custom-secondary focus-visible:ring-custom-primary"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addExperience}
              className="w-full border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
            >
              Add Experience
            </Button>
          </div>

          <div className="space-y-4 mt-8">
            <h3 className="text-lg font-medium text-custom-primary">Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-md relative border-custom-secondary">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeEducation(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <Label htmlFor={`edu-degree-${index}`} className="text-custom-primary">
                    Degree
                  </Label>
                  <Input
                    id={`edu-degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                    className="border-custom-secondary focus-visible:ring-custom-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-institution-${index}`} className="text-custom-primary">
                    Institution
                  </Label>
                  <Input
                    id={`edu-institution-${index}`}
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                    className="border-custom-secondary focus-visible:ring-custom-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`edu-period-${index}`} className="text-custom-primary">
                    Period
                  </Label>
                  <Input
                    id={`edu-period-${index}`}
                    value={edu.period}
                    onChange={(e) => handleEducationChange(index, "period", e.target.value)}
                    placeholder="e.g. 2013 - 2017"
                    className="border-custom-secondary focus-visible:ring-custom-primary"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addEducation}
              className="w-full border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
            >
              Add Education
            </Button>
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("basic")}
              className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
            >
              Previous: Basic Info
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("additional")}
              className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
            >
              Next: Additional
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="additional" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="interests" className="text-custom-primary">
              Interests (comma separated)
            </Label>
            <Textarea
              id="interests"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g. Coding, Hiking, Photography"
              className="border-custom-secondary focus-visible:ring-custom-primary"
              rows={3}
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveTab("experience")}
              className="border-custom-primary text-custom-primary hover:bg-custom-primary hover:text-custom-background"
            >
              Previous: Experience
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <DialogFooter className="mt-6">
        <Button type="submit" className="bg-custom-primary text-custom-background hover:bg-custom-primary/90">
          Save Profile
        </Button>
      </DialogFooter>
    </form>
  )
}

