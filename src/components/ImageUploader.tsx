
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onUpload: (url: string) => void;
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      
      // Make sure to upload to the specific folder structure requested
      const filePath = `student-questions/${Math.random()}-${Date.now()}.${fileExt}`;
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB');
      }
      
      // Check file type
      if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
        throw new Error('File must be an image (JPEG, PNG, GIF, or WEBP)');
      }
      
      // Create URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      // Upload to Supabase Storage - using asknexus bucket
      const { data, error } = await supabase.storage
        .from('asknexus')
        .upload(filePath, file);
        
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('asknexus')
        .getPublicUrl(data.path);
        
      onUpload(publicUrl);
      toast.success("Image uploaded successfully.");
      
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || "Error uploading image");
    } finally {
      setUploading(false);
    }
  };
  
  const clearImage = () => {
    setPreview(null);
    onUpload('');
  };
  
  return (
    <div className="w-full">
      <div className="mb-4">
        {preview ? (
          <div className="relative">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-h-48 rounded-md object-contain" 
            />
            <button 
              onClick={clearImage}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-2 text-gray-500" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*" 
              disabled={uploading} 
            />
          </label>
        )}
      </div>
      
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div className="bg-nexus-600 h-2.5 rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
