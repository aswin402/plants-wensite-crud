// components/EditDialog.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { updatePlant } from "@/lib/api";
import ImageUpload from "./ImageUpload";

interface Plant {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
}

interface EditDialogProps {
  plant: Plant;
  onPlantUpdated: (plant: Plant) => void;
}

export default function EditDialog({ plant, onPlantUpdated }: EditDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (plant && open) {
      setFormData({
        name: plant.name || "",
        category: plant.category || "",
        price: plant.price?.toString() || "",
        stock: plant.stock?.toString() || "",
        description: plant.description || "",
        imageUrl: plant.imageUrl || "",
      });
    }
  }, [plant, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description,
        imageUrl: formData.imageUrl,
      };

      const updatedPlant = await updatePlant(plant.id, updatedData);
      onPlantUpdated(updatedPlant.data);
      setOpen(false);
    } catch (error) {
      console.error("Failed to update plant:", error);
      alert("Failed to update plant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Plant</DialogTitle>
          <DialogDescription>
            Edit the plant details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right">
                Category
              </Label>
              <Input
                id="edit-category"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">
                Price
              </Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-stock" className="text-right">
                Stock
              </Label>
              <Input
                id="edit-stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="col-span-3"
                rows={3}
              />
            </div>
           <div className="grid grid-cols-4 items-center gap-4">
  <Label htmlFor="image" className="text-right">
    Image
  </Label>
  <div className="col-span-3">
    <ImageUpload
      value={formData.imageUrl}
      onChange={(url) => setFormData({...formData, imageUrl: url})}
      disabled={loading}
    />
  </div>
</div>

          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}