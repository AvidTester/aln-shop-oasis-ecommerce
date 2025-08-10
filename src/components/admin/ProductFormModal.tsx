
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { productService, Product, ProductFormData } from '@/services/productService';
import { categoryService, Category } from '@/services/categoryService';
import { brandService, Brand } from '@/services/brandService';
import { X, Upload, Wand2 } from 'lucide-react';
import { convertFileToBase64, loadImage, removeBackground } from '@/utils/backgroundRemoval';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

const ProductFormModal = ({ isOpen, onClose, onSuccess, product }: ProductFormModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    brand: '',
    images: [''],
    stock: 0,
    isFeatured: false,
    isActive: true,
    badge: '',
    sizes: [] as string[],
    colors: [] as { name: string; value: string }[],
    features: [] as string[],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newColor, setNewColor] = useState({ name: '', value: '#000000' });
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const badgeOptions = ['New', 'Sale', 'Best Seller', 'Limited', 'Featured'];

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice || 0,
        category: product.category._id,
        brand: product.brand._id,
        images: product.images.length ? product.images : [''],
        stock: product.stock,
        isFeatured: product.isFeatured,
        isActive: product.isActive,
        badge: product.badge || '',
        sizes: product.sizes || [],
        colors: product.colors || [],
        features: product.features || [],
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: 0,
        originalPrice: 0,
        category: '',
        brand: '',
        images: [''],
        stock: 0,
        isFeatured: false,
        isActive: true,
        badge: '',
        sizes: [],
        colors: [],
        features: [],
      });
    }
  }, [product, isOpen]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      setCategories(response);
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await brandService.getBrands();
      setBrands(response);
    } catch (error) {
      toast.error('Failed to fetch brands');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productData = {
        ...formData,
        images: formData.images.filter(img => img.trim() !== ''),
        originalPrice: formData.originalPrice || undefined,
        badge: formData.badge || undefined,
      };

      if (product) {
        await productService.updateProduct(product._id, productData);
        toast.success('Product updated successfully');
      } else {
        await productService.createProduct(productData);
        toast.success('Product created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      toast.error(product ? 'Failed to update product' : 'Failed to create product');
    } finally {
      setIsLoading(false);
    }
  };

  const addImage = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length ? newImages : [''] });
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const toggleSize = (size: string) => {
    const newSizes = formData.sizes.includes(size)
      ? formData.sizes.filter(s => s !== size)
      : [...formData.sizes, size];
    setFormData({ ...formData, sizes: newSizes });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...formData.features, newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const addColor = () => {
    if (newColor.name.trim()) {
      setFormData({ ...formData, colors: [...formData.colors, newColor] });
      setNewColor({ name: '', value: '#000000' });
    }
  };

  const removeColor = (index: number) => {
    const newColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: newColors });
  };

  const handleFileUpload = async (index: number, file: File) => {
    try {
      setIsProcessingImage(true);
      const base64Image = await convertFileToBase64(file);
      updateImage(index, base64Image);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleRemoveBackground = async (index: number) => {
    const imageUrl = formData.images[index];
    if (!imageUrl) {
      toast.error('Please upload an image first');
      return;
    }

    try {
      setIsProcessingImage(true);
      toast.info('Removing background... This may take a moment');

      // Load the image
      let imageElement: HTMLImageElement;
      if (imageUrl.startsWith('data:')) {
        // Base64 image
        imageElement = await loadImage(new Blob([atob(imageUrl.split(',')[1])], { type: 'image/png' }));
      } else {
        // URL image - convert to blob first
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        imageElement = await loadImage(blob);
      }

      // Remove background
      const processedBlob = await removeBackground(imageElement);
      const processedBase64 = await convertFileToBase64(new File([processedBlob], 'processed-image.png', { type: 'image/png' }));
      
      updateImage(index, processedBase64);
      toast.success('Background removed successfully');
    } catch (error) {
      console.error('Background removal error:', error);
      toast.error('Failed to remove background. Please try again.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand *</Label>
              <Select value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand._id} value={brand._id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="badge">Badge</Label>
            <Select value={formData.badge} onValueChange={(value) => setFormData({ ...formData, badge: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select badge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No Badge</SelectItem>
                {badgeOptions.map((badge) => (
                  <SelectItem key={badge} value={badge}>
                    {badge}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Images</Label>
            {formData.images.map((image, index) => (
              <div key={index} className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="url"
                    value={image}
                    onChange={(e) => updateImage(index, e.target.value)}
                    placeholder="Image URL"
                    className="flex-1"
                  />
                  {formData.images.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeImage(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(index, file);
                      }}
                      className="hidden"
                      id={`file-upload-${index}`}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`file-upload-${index}`)?.click()}
                      disabled={isProcessingImage}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                  {image && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveBackground(index)}
                      disabled={isProcessingImage}
                    >
                      <Wand2 className="h-4 w-4 mr-2" />
                      Remove BG
                    </Button>
                  )}
                </div>
                {image && (
                  <div className="w-32 h-32 border rounded overflow-hidden">
                    <img
                      src={image}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addImage} disabled={isProcessingImage}>
              Add Image
            </Button>
            {isProcessingImage && (
              <p className="text-sm text-muted-foreground">Processing image...</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Sizes</Label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={formData.sizes.includes(size)}
                    onCheckedChange={() => toggleSize(size)}
                  />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Colors</Label>
            <div className="space-y-2">
              {formData.colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded border" style={{ backgroundColor: color.value }}></div>
                  <span className="flex-1">{color.name}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeColor(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newColor.name}
                  onChange={(e) => setNewColor({ ...newColor, name: e.target.value })}
                  placeholder="Color name"
                />
                <Input
                  type="color"
                  value={newColor.value}
                  onChange={(e) => setNewColor({ ...newColor, value: e.target.value })}
                  className="w-20"
                />
                <Button type="button" variant="outline" onClick={addColor}>
                  Add
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Features</Label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1">{feature}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add feature"
                />
                <Button type="button" variant="outline" onClick={addFeature}>
                  Add
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
              />
              <Label htmlFor="isFeatured">Featured</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-aln-orange hover:bg-aln-orange-dark">
              {isLoading ? 'Saving...' : (product ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
