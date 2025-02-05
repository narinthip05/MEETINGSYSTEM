// Imports
import { UsersData } from "../interface/IUsers";
import { Repairrequests } from "../interface/IRepairrequests";
import { Meetingroom } from "../interface/IMeetingroom";
import { Equipment } from "../interface/IEquipment";

// Base API URL
const apiURL = "http://localhost:8080";

// API Functions

// Create User
export async function createUser(data: UsersData) {
  try {
    const response = await fetch(`${apiURL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return { status: false, message: res.error || "Failed to create user" };
    }
  } catch (error: any) {
    console.error("Error creating user:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Fetch Repair Requests
export async function fetchRepairRequests(): Promise<Repairrequests[]> {
  try {
    const response = await fetch(`${apiURL}/repair-requests`);

    if (!response.ok) {
      throw new Error("Failed to fetch repair requests");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching repair requests:", error);
    return [];
  }
}

// Fetch Meeting Rooms
export async function fetchMeetingRooms(): Promise<Meetingroom[]> {
  try {
    const response = await fetch(`${apiURL}/meeting-rooms`);

    if (!response.ok) {
      throw new Error("Failed to fetch meeting rooms");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching meeting rooms:", error);
    return [];
  }
}

// Fetch Equipment
export async function fetchEquipment(): Promise<Equipment[]> {
  try {
    const response = await fetch(`${apiURL}/equipment`);

    if (!response.ok) {
      throw new Error("Failed to fetch equipment");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching equipment:", error);
    return [];
  }
}

// Example: Delete User
export async function deleteUser(userId: number) {
  try {
    const response = await fetch(`${apiURL}/users/${userId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { status: true, message: "User deleted successfully" };
    } else {
      const res = await response.json();
      return { status: false, message: res.error || "Failed to delete user" };
    }
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

async function getAllRepairRequest() {
  try {
    const response = await fetch(`${apiURL}/repair_requests`, { method: "GET" });

    if (response.ok) {
      const jsonData = await response.json();
      return { status: true, data: jsonData.data }; // Extract 'data' field
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch repair_requests",
      };
    }
  } catch (error) {
    console.error("Error fetching repairs:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

export {
  getAllRepairRequest,
};
