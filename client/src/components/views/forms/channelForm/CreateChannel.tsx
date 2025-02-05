import React, { useState } from 'react';

interface CreateChannelProps {
  setChannelData: (data: { channelURL: string }) => void;
}

export const CreateChannel: React.FC<CreateChannelProps> = ({
  setChannelData,
}) => {
  const [channelName, setChannelName] = useState('');
  const [channelURL, setChannelURL] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', '55debate');
    data.append('cloud_name', 'dgk8lodnt');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dgk8lodnt/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const uploadImageURL = await res.json();
      const uploadedURL = uploadImageURL.secure_url;
      setChannelURL(uploadedURL);

      setChannelData({ channelURL: uploadedURL });
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  return (
    <>
      <div>
        {channelName ? (
          <p className="channel-handle h-10">
            @{channelName.replace(/\s+/g, '').toLowerCase()}
          </p>
        ) : (
          <p className="h-10"></p>
        )}

        <div className="input-container">
          <input
            type="text"
            name="channelName"
            placeholder="Enter channel name"
            required
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </div>
      </div>

      {/* Upload image */}
      <div>
        <p className="file-info">Upload a 2x3 aspect ratio banner</p>
        <div className="input-container">
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div>
        {channelURL && <p>Image uploaded successfully!</p>}
      </div>

      <div>
        <div className="input-container">
          <textarea
            name="description"
            placeholder="Enter a channel description (max 80 characters)"
            required
            maxLength={80}
          />
        </div>
      </div>

      <label>
        <input type="checkbox" required /> I confirm the channel creation
      </label>
    </>
  );
};

// {
//     "channelName": "iLovePonies",
//     "description": "Hello this is a description",
//     "formType": "channel",
//     "channelURL": "https://res.cloudinary.com/dgk8lodnt/image/upload/v1738789497/fragponey_logo_display_picture_ugykon.png"
// }
