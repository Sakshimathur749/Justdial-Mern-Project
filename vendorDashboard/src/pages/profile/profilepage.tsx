import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DarkModeSwitcher from '../../components/Header/DarkModeSwitcher';

const ProfilePage = ({ profileIncomplete }: any) => {
  const [profile, setProfile] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({
    username: '',
    email: '',
    mobileNumber: '',
    bio: '',
    city: '',
    address:'',
    profilepicture: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showIncompleteProfilePopup, setShowIncompleteProfilePopup] =
    useState(false);
  const [passwordChangeData, setPasswordChangeData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
        setEditFormData({
          username: data.username,
          email: data.email,
          mobileNumber: data.mobileNumber,
          bio: data.bio || '',
          city: data.city || '',
          address:data.address||'',
          profilepicture: data.profilepicture || null,
        });
        localStorage.setItem("userName",data.username)
        localStorage.setItem("profilepicture",data.profilepicture)
        if (!data.username || !data.email || !data.mobileNumber || !data.city) {
          setShowIncompleteProfilePopup(true);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  const handlePasswordChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordChangeData({
      ...passwordChangeData,
      [e.target.name]: e.target.value,
    });
  };
  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } =
      passwordChangeData;
    if (newPassword !== confirmPassword) {
      setPasswordChangeError('New password and confirmation do not match.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:5000/api/user/change-password',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
            confirmPassword,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      const data = await response.json();
      setPasswordChangeSuccess(data.message);
      setPasswordChangeError('');
    } catch (error: any) {
      setPasswordChangeError(error.message);
      setPasswordChangeSuccess('');
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setEditFormData({ ...editFormData, profilepicture: file });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !editFormData.username ||
      !editFormData.email ||
      !editFormData.mobileNumber ||
      !editFormData.city||!editFormData.address 
    ) {
      setShowIncompleteProfilePopup(true);
      return;
    }
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('username', editFormData.username);
    formData.append('email', editFormData.email);
    formData.append('mobileNumber', editFormData.mobileNumber);
    formData.append('bio', editFormData.bio);
    formData.append('city', editFormData.city);
    formData.append('address', editFormData.address);
    if (editFormData.profilepicture) {
      formData.append('profilepicture', editFormData.profilepicture);
    }
    try {
      const response = await fetch(
        'http://localhost:5000/api/user/profile-edit',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await response.json();
      setProfile(data);
      setEditFormData({
        username: data.username,
        email: data.email,
        mobileNumber: data.mobileNumber,
        bio: data.bio || '',
        city: data.city || '',
        address: data.address || '',
        profilepicture: data.profilepicture || null,
      });
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Breadcrumb pageName="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="space-y-6">
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                  <img
                    src={
                      editFormData.profilepicture
                        ? `http://localhost:5173/src/images/profile_image/${editFormData.profilepicture}`
                        : '/images/user/owner.jpg'
                    }
                    alt="user"
                  />
                </div>
                <div className="order-3 xl:order-2">
                  <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                    {profile?.username}
                  </h4>
                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {profile?.bio || 'Bio'}
                    </p>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {profile?.city || 'City'}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleEditClick}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    fill=""
                  ></path>
                </svg>
                Edit
              </button>
            </div>
          </div>
          {successMessage && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-xl">
                <p className="text-green-500 font-semibold">{successMessage}</p>
                <button
                  onClick={() => setSuccessMessage('')}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {errorMessage && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-xl">
                <p className="text-red-500 font-semibold">{errorMessage}</p>
                <button
                  onClick={() => setErrorMessage('')}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {showIncompleteProfilePopup && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-xl">
                <p className="text-red-500 font-semibold">
                  Please fill out all required fields to complete your profile.
                </p>
                <button
                  onClick={() => setShowIncompleteProfilePopup(false)}
                  className="mt-4 text-blue-500 hover:underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {!isEditing && (
            <>
              <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                      <div>
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Name
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {profile?.username}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Email address
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {profile?.email}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Phone
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {profile?.mobileNumber}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                          Bio
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {profile?.bio || '-'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                      Address
                    </h4>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {profile?.address }{profile?.city}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                  Change Password
                </h4>
                <form onSubmit={handlePasswordChangeSubmit} className="mt-4">
                  <div className="grid gap-4">
                    <div>
                      <label className="text-xs">Current Password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordChangeData.currentPassword}
                        onChange={handlePasswordChangeInput}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-xs">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordChangeData.newPassword}
                        onChange={handlePasswordChangeInput}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="text-xs">Confirm New Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordChangeData.confirmPassword}
                        onChange={handlePasswordChangeInput}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Change Password
                  </button>
                </form>
                {passwordChangeError && (
                  <p className="text-red-500 mt-4">{passwordChangeError}</p>
                )}
                {passwordChangeSuccess && (
                  <p className="text-green-500 mt-4">{passwordChangeSuccess}</p>
                )}
              </div>
            </>
          )}
          {isEditing && (
            <form
              onSubmit={handleSubmit}
              className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6"
            >
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">
                Edit Profile
              </h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                <div>
                  <label className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    name="profilepicture"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={editFormData.username}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={editFormData.mobileNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Bio
                  </label>
                  <input
                    type="text"
                    name="bio"
                    value={editFormData.bio}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={editFormData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editFormData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;