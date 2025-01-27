"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Plus, Mail, Phone, Edit, Trash } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  project: string;
  email: string;
  phone: string;
  availability: "Available" | "On Set" | "In Post";
  tasks?: string[]; // Optional tasks field
}

type FormData = Omit<TeamMember, "id">;

interface MemberFormProps {
  onSubmit: () => Promise<void>;
  submitText: string;
}

const INITIAL_FORM_STATE: FormData = {
  name: "",
  role: "",
  project: "",
  email: "",
  phone: "",
  availability: "Available",
};

export default function Team() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] =
    useState<boolean>(false);
  const [isEditMemberDialogOpen, setIsEditMemberDialogOpen] =
    useState<boolean>(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch team members");
      const data: TeamMember[] = await response.json();
      setTeamMembers(data);
    } catch (error) {
      toast.error("Failed to load team members");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field?: string
  ): void => {
    const { name, value } = e.target;

    if (field === "tasks") {
      // Split tasks by commas and trim whitespace
      const tasksArray = value.split(",").map((task) => task.trim());
      setFormData((prev) => ({
        ...prev,
        tasks: tasksArray,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: keyof FormData, value: string): void => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = (): void => {
    setFormData(INITIAL_FORM_STATE);
    setEditingMember(null);
  };

  const handleAddMember = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");

      // Prepare the request body
      const requestBody = {
        ...formData,
        tasks: formData.tasks || [], // Ensure tasks is an array
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error("Failed to add team member");
      toast.success("Team member added successfully");
      setIsAddMemberDialogOpen(false);
      resetForm();
      fetchTeamMembers();
    } catch (error) {
      toast.error("Failed to add team member");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMember = async (): Promise<void> => {
    if (!editingMember) return;
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/team/${editingMember.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to update team member");
      toast.success("Team member updated successfully");
      setIsEditMemberDialogOpen(false);
      resetForm();
      fetchTeamMembers();
    } catch (error) {
      toast.error("Failed to update team member");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = async (id: number): Promise<void> => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/team/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete team member");
      toast.success("Team member deleted successfully");
      fetchTeamMembers();
    } catch (error) {
      toast.error("Failed to delete team member");
    } finally {
      setIsLoading(false);
    }
  };

  const openEditDialog = (member: TeamMember): void => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      project: member.project,
      email: member.email,
      phone: member.phone,
      availability: member.availability,
    });
    setIsEditMemberDialogOpen(true);
  };

  const MemberForm: React.FC<MemberFormProps> = ({ onSubmit, submitText }) => (
    <div className="grid gap-4 py-4 bg-white">
      {/* Name Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          className="col-span-3"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Role Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="role" className="text-right">
          Role
        </Label>
        <Input
          id="role"
          name="role"
          className="col-span-3"
          value={formData.role}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Project Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="project" className="text-right">
          Project
        </Label>
        <Select
          name="project"
          value={formData.project}
          onValueChange={(value) => handleSelectChange("project", value)}
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Neon Nights">Neon Nights</SelectItem>
            <SelectItem value="Whispers in the Wind">
              Whispers in the Wind
            </SelectItem>
            <SelectItem value="Quantum Leap">Quantum Leap</SelectItem>
            <SelectItem value="Echoes of Yesterday">
              Echoes of Yesterday
            </SelectItem>
            <SelectItem value="Midnight Serenade">Midnight Serenade</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Email Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="email" className="text-right">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          className="col-span-3"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Phone Field */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="phone" className="text-right">
          Phone
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          className="col-span-3"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Availability Field */}
      <div className="grid grid-cols-4 items-center gap-4 bg-white">
        <Label htmlFor="availability" className="text-right">
          Availability
        </Label>
        <Select
          name="availability"
          value={formData.availability}
          onValueChange={(value) =>
            handleSelectChange(
              "availability",
              value as FormData["availability"]
            )
          }
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Available">Available</SelectItem>
            <SelectItem value="On Set">On Set</SelectItem>
            <SelectItem value="In Post">In Post</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Field (Optional) */}
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="tasks" className="text-right">
          Tasks
        </Label>
        <Input
          id="tasks"
          name="tasks"
          className="col-span-3"
          value={formData.tasks?.join(", ")} // Assuming tasks is an array
          onChange={(e) => handleInputChange(e, "tasks")}
          placeholder="Enter tasks separated by commas"
        />
      </div>

      {/* Submit Button */}
      <DialogFooter>
        <Button onClick={onSubmit} disabled={isLoading}>
          {isLoading ? "Processing..." : submitText}
        </Button>
      </DialogFooter>
    </div>
  );

  const filteredTeamMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team</h1>
        <Dialog
          open={isAddMemberDialogOpen}
          onOpenChange={setIsAddMemberDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to your film production team
              </DialogDescription>
            </DialogHeader>
            <MemberForm onSubmit={handleAddMember} submitText="Add Member" />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex space-x-4 mb-4">
        <div className="flex-grow relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40&text=${member.name[0]}`}
                  />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 bg-white">
                {/* Existing fields (email, phone, project, availability) */}
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">{member.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current Project:
                  </span>
                  <Badge variant="outline">{member.project}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Availability:
                  </span>
                  <Badge
                    variant={
                      member.availability === "Available"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {member.availability}
                  </Badge>
                </div>

                {/* Display Tasks */}
                {member.tasks && member.tasks.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Tasks:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {member.tasks.map((task, index) => (
                        <Badge key={index} variant="outline">
                          {task}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => openEditDialog(member)}
                disabled={isLoading}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => handleDeleteMember(member.id)}
                disabled={isLoading}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog
        open={isEditMemberDialogOpen}
        onOpenChange={setIsEditMemberDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>Update team member details</DialogDescription>
          </DialogHeader>
          <MemberForm onSubmit={handleEditMember} submitText="Save Changes" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
