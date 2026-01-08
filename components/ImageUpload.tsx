// components/ImageUpload.tsx
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated upload function - replace with your actual upload logic
  // For a real implementation, you'll need to upload to Cloudinary, AWS S3, etc.
  const simulateUpload = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would be the URL from your storage service
        const fakeUrl = URL.createObjectURL(file);
        resolve(fakeUrl);
      }, 1500);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Simulate upload (replace with actual upload)
      const imageUrl = await simulateUpload(file);
      
      // Update parent component with the URL
      onChange(imageUrl);
      
      // In a real implementation, you would:
      // 1. Upload to your storage service (Cloudinary, S3, etc.)
      // 2. Get back a URL
      // 3. Call onChange with that URL
      
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
      setPreview(null);
    } finally {
      setUploading(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="image-upload">Plant Image</Label>
        {preview && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemoveImage}
            disabled={disabled || uploading}
            className="h-8 px-2"
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        )}
      </div>

      <Input
        ref={fileInputRef}
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || uploading}
      />

      {preview ? (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
          {uploading && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            {uploading ? (
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
            ) : (
              <Upload className="h-12 w-12 text-muted-foreground" />
            )}
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {uploading ? "Uploading..." : "Upload an image"}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || uploading}
              className="mt-4"
            >
              {uploading ? "Uploading..." : "Select Image"}
            </Button>
          </div>
        </div>
      )}

      {/* Alternative: Direct URL input */}
      {!preview && !uploading && (
        <div className="space-y-2 pt-4">
          <Label htmlFor="image-url">Or enter image URL</Label>
          <Input
            id="image-url"
            placeholder="https://example.com/plant-image.jpg"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
}