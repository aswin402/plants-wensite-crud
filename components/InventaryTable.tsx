// components/InventaryTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { CategorySelect } from "./ui/category-select"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/Skeleton"; 
import CreateDialog from "./CreateDialog";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import { fetchPlants } from "@/lib/api";

// Fix: Create a proper Plant type that matches both API response and frontend
type Plant = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  // Make these optional since they might not always be present
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function InventoryTable() {
  const router = useRouter();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    try {
      const data = await fetchPlants();
      // Ensure we have the right data structure
      setPlants(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load plants:", error);
      setPlants([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories for the combobox
  const categories = [...new Set(plants.map(plant => plant.category))].filter(Boolean);

  // Filter plants by name and category
  const filteredPlants = plants.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || plant.category === selectedCategory)
  );

  const handlePlantCreated = (newPlant: Plant) => {
    setPlants(prev => [newPlant, ...prev]);
  };

  // Fix: Handle Plant type mismatch
  const handlePlantUpdated = (updatedPlant: Plant) => {
    setPlants(prev => prev.map(plant => {
      if (plant.id === updatedPlant.id) {
        // Merge the updated plant with the original to preserve missing fields
        return {
          ...plant, // Keep original fields (userId, createdAt, etc.)
          ...updatedPlant, // Apply updates
          id: plant.id, // Ensure id stays the same
        };
      }
      return plant;
    }));
  };

  const handlePlantDeleted = (plantId: number) => {
    setPlants(prev => prev.filter(plant => plant.id !== plantId));
  };

  if (loading) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="w-full h-4" /></TableHead>
              <TableHead><Skeleton className="w-full h-4" /></TableHead>
              <TableHead><Skeleton className="w-full h-4" /></TableHead>
              <TableHead><Skeleton className="w-full h-4" /></TableHead>
              <TableHead><Skeleton className="w-full h-4" /></TableHead>
              <TableHead className="text-right"><Skeleton className="w-full h-4" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 6 }).map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="w-full h-4" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4">
        <div className="relative max-w-sm w-full">
          <Input
            placeholder="Filter plants..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>

        {/* Replace Combobox with CategorySelect */}
        <CategorySelect
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categories.map(cat => ({ value: cat, label: cat }))}
          placeholder="Filter by category"
        />
        
        <CreateDialog onPlantCreated={handlePlantCreated} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlants.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                {plants.length === 0 ? "No plants found. Create your first plant!" : "No plants match your filters."}
              </TableCell>
            </TableRow>
          ) : (
            filteredPlants.map((plant) => {
              const slugifiedName = plant.name.toLowerCase().replace(/\s+/g, "-");
              const slug = `${plant.id}--${slugifiedName}`;
              const plantUrl = `/plants/${slug}`;

              return (
                <TableRow 
                  key={plant.id} 
                  className="cursor-pointer hover:bg-muted/50" 
                  onClick={() => router.push(plantUrl)}
                >
                  <TableCell>{plant.id}</TableCell>
                  <TableCell className="font-medium">{plant.name}</TableCell>
                  <TableCell>{plant.category}</TableCell>
                  <TableCell>${plant.price.toFixed(2)}</TableCell>
                  <TableCell>{plant.stock}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className="flex justify-end space-x-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EditDialog plant={plant} onPlantUpdated={handlePlantUpdated} />
                      <DeleteDialog plant={plant} onPlantDeleted={handlePlantDeleted} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}