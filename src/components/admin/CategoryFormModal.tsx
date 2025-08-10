
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { categoryService, Category } from '@/services/categoryService';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { Upload, Wand2 } from 'lucide-react';

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: Category | null;
}

const CategoryFormModal = ({ isOpen, onClose, onSuccess, category }: CategoryFormModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [removeBackgroundEnabled, setRemoveBackgroundEnabled] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || '',
        image: category.image || '',
        isActive: category.isActive,
      });
      setPreviewUrl(category.image || '');
    } else {
      setFormData({
        name: '',
        description: '',
        image: '',
        isActive: true,
      });
      setPreviewUrl('');
    }
    setImageFile(null);
    setUploadMethod('url');
  }, [category, isOpen]);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    if (removeBackgroundEnabled) {
      await processImageWithBackgroundRemoval(file);
    }
  };

  const processImageWithBackgroundRemoval = async (file: File) => {
    setIsProcessingImage(true);
    try {
      const imageElement = await loadImage(file);
      const processedBlob = await removeBackground(imageElement);
      
      const processedFile = new File([processedBlob], `processed_${file.name}`, {
        type: 'image/png',
      });
      
      setImageFile(processedFile);
      const newObjectUrl = URL.createObjectURL(processedBlob);
      setPreviewUrl(newObjectUrl);
      
      toast.success('Background removed successfully!');
    } catch (error) {
      console.error('Error removing background:', error);
      toast.error('Failed to remove background. Using original image.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    const response = await fetch('https://api.cloudinary.com/v1_1/dcbryptkx/image/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let finalFormData = { ...formData };

      // If uploading from file, upload to Cloudinary first
      if (uploadMethod === 'file' && imageFile) {
        const uploadedImageUrl = await uploadImageToCloudinary(imageFile);
        finalFormData.image = uploadedImageUrl;
      }

      if (category) {
        await categoryService.updateCategory(category._id, finalFormData);
        toast.success('Category updated successfully');
      } else {
        await categoryService.createCategory(finalFormData);
        toast.success('Category created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(category ? 'Failed to update category' : 'Failed to create category');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add New Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <Label>Image</Label>
            
            {/* Upload Method Toggle */}
            <div className="flex space-x-4">
              <Button
                type="button"
                variant={uploadMethod === 'url' ? 'default' : 'outline'}
                onClick={() => setUploadMethod('url')}
                size="sm"
              >
                URL
              </Button>
              <Button
                type="button"
                variant={uploadMethod === 'file' ? 'default' : 'outline'}
                onClick={() => setUploadMethod('file')}
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>

            {uploadMethod === 'url' ? (
              <Input
                type="url"
                value={formData.image}
                onChange={(e) => {
                  setFormData({ ...formData, image: e.target.value });
                  setPreviewUrl(e.target.value);
                }}
                placeholder="Enter image URL"
              />
            ) : (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="removeBackground"
                    checked={removeBackgroundEnabled}
                    onCheckedChange={setRemoveBackgroundEnabled}
                  />
                  <Label htmlFor="removeBackground" className="flex items-center">
                    <Wand2 className="w-4 h-4 mr-2" />
                    Remove Background (AI)
                  </Label>
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  disabled={isProcessingImage}
                />
                {isProcessingImage && (
                  <p className="text-sm text-muted-foreground">Processing image...</p>
                )}
              </div>
            )}

            {/* Image Preview */}
            {previewUrl && (
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="mt-2 border rounded-lg p-4 bg-muted/20">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-w-full h-32 object-contain mx-auto rounded"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-aln-orange hover:bg-aln-orange-dark">
              {isLoading ? 'Saving...' : (category ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormModal;
