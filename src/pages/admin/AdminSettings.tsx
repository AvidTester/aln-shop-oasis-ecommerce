
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Settings, Store, Mail, Bell, Lock } from 'lucide-react';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    storeName: 'ALN SHOP',
    storeEmail: 'contact@alnshop.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Main St, City, State 12345',
    currency: 'USD',
    taxRate: 8.5,
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    orderNotifications: true,
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-8">
      <div className="flex items-center space-x-3 mb-8">
        <Settings className="h-8 w-8 text-aln-orange" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="store" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="store">Store</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Store className="h-5 w-5" />
                <span>Store Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name
                  </label>
                  <Input
                    value={settings.storeName}
                    onChange={(e) => handleSettingChange('storeName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Email
                  </label>
                  <Input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleSettingChange('storeEmail', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Phone
                  </label>
                  <Input
                    value={settings.storePhone}
                    onChange={(e) => handleSettingChange('storePhone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={settings.currency}
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store Address
                </label>
                <Input
                  value={settings.storeAddress}
                  onChange={(e) => handleSettingChange('storeAddress', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tax Rate (%)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) => handleSettingChange('taxRate', parseFloat(e.target.value))}
                />
              </div>
              <Button className="bg-aln-orange hover:bg-aln-orange-dark">
                Save Store Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleSettingChange('smsNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Low Stock Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified when products are low in stock</p>
                </div>
                <Switch
                  checked={settings.lowStockAlerts}
                  onCheckedChange={(checked) => handleSettingChange('lowStockAlerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Order Notifications</h3>
                  <p className="text-sm text-gray-600">Get notified about new orders</p>
                </div>
                <Switch
                  checked={settings.orderNotifications}
                  onCheckedChange={(checked) => handleSettingChange('orderNotifications', checked)}
                />
              </div>
              <Button className="bg-aln-orange hover:bg-aln-orange-dark">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <Input type="password" placeholder="Current Password" />
                  <Input type="password" placeholder="New Password" />
                  <Input type="password" placeholder="Confirm New Password" />
                  <Button className="bg-aln-orange hover:bg-aln-orange-dark">
                    Update Password
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add an extra layer of security to your account
                </p>
                <Button variant="outline">
                  Enable 2FA
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Version</h4>
                  <p className="text-sm text-gray-600">v1.0.0</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Database</h4>
                  <p className="text-sm text-gray-600">MongoDB Connected</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Server Status</h4>
                  <p className="text-sm text-green-600">Online</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium">Last Backup</h4>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <Button className="bg-aln-orange hover:bg-aln-orange-dark">
                Run System Check
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-600">Payment gateway integration coming soon...</p>
                <p className="text-sm text-gray-500 mt-2">Currently accepting cash on delivery only</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
