// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchPlants() {
  const res = await fetch(`${API_BASE_URL}/plants`, {
    credentials: 'include', // Important for auth cookies
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch plants');
  }
  
  return res.json();
}

export async function createPlant(data: any) {
  const res = await fetch(`${API_BASE_URL}/plants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  
if (!res.ok) {
  const text = await res.text();
  console.error("Create plant error:", text);
  throw new Error(text);
}
  
  return res.json();
}

export async function updatePlant(id: number, data: any) {
  const res = await fetch(`${API_BASE_URL}/plants/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  
  if (!res.ok) {
    throw new Error('Failed to update plant');
  }
  
  return res.json();
}

export async function deletePlant(id: number) {
  const res = await fetch(`${API_BASE_URL}/plants/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  
  if (!res.ok) {
    throw new Error('Failed to delete plant');
  }
  
  return res.json();
}