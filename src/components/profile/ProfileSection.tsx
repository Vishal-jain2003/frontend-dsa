


import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Mail, Camera } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { User } from '@/types/User'; // adjust the path if needed

const ProfileSection: React.FC = () => {
  const { user } = useAuth();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.imageUrl) {
      setProfileImage(user.imageUrl);
    }
  }, [user]);

  if (!user) return null;

  const getInitials = (name: string) =>
    name.split(' ').map(part => part[0]).join('').toUpperCase();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'user_profile');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dsbbhvnoi/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.secure_url;
      setProfileImage(imageUrl);

      const saveRes = await fetch('http://localhost:8080/api/profile/upload', {
        method: 'POST',
        body: JSON.stringify({ userId: user.id, imageUrl }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!saveRes.ok) throw new Error('Failed to save image URL in DB');
      console.log('Image URL saved in backend DB');
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Image upload failed');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border-0 shadow-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage
                src={profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${user.username}`}
                alt={user.username}
              />
              <AvatarFallback className="text-lg">{getInitials(user.username)}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8"
              onClick={handleUploadClick}
              title="Change profile picture"
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <div className="space-y-4 text-center sm:text-left flex-1">
            <div>
              <h3 className="text-2xl font-bold">{user.username}</h3>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mt-1">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <Link to="/settings">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSection;
