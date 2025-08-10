
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { brandService, Brand } from '@/services/brandService';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import { Upload, Wand2 } from 'lucide-react';

interface BrandFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  brand?: Brand | null;
}

const BrandFormModal = ({ isOpen, onClose, onSuccess, brand }: BrandFormModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
    isActive: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [removeBackgroundEnabled, setRemoveBackgroundEnabled] = useState(false);

  useEffect(() => {
    if (brand) {
      setFormData({
        name: brand.name,
        description: brand.description || '',
        logo: brand.logo || '',
        website: brand.website || '',
        isActive: brand.isActive,
      });
      setPreviewUrl(brand.logo || '');
    } else {
      setFormData({
        name: '',
        description: '',
        logo: '',
        website: '',
        isActive: true,
      });
      setPreviewUrl('');
    }
    setLogoFile(null);
    setUploadMethod('url');
  }, [brand, isOpen]);

  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
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
      
      setLogoFile(processedFile);
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
      if (uploadMethod === 'file' && logoFile) {
        const uploadedLogoUrl = await uploadImageToCloudinary(logoFile);
        finalFormData.logo = uploadedLogoUrl;
      }

      if (brand) {
        await brandService.updateBrand(brand._id, finalFormData);
        toast.success('Brand updated successfully');
      } else {
        await brandService.createBrand(finalFormData);
        toast.success('Brand created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(brand ? 'Failed to update brand' : 'Failed to create brand');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{brand ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
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
            <Label>Logo</Label>
            
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
                value={formData.logo}
                onChange={(e) => {
                  setFormData({ ...formData, logo: e.target.value });
                  setPreviewUrl(e.target.value);
                }}
                placeholder="Enter logo URL"
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
                  onChange={handleLogoFileChange}
                  disabled={isProcessingImage}
                />
                {isProcessingImage && (
                  <p className="text-sm text-muted-foreground">Processing logo...</p>
                )}
              </div>
            )}

            {/* Logo Preview */}
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

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
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
              {isLoading ? 'Saving...' : (brand ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BrandFormModal;
