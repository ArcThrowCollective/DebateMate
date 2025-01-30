import React, { useState } from 'react';

export const CreateChannel: React.FC = () => {
  const [channelName, setChannelName] = useState('');

  return (
    <>
      <div>
        {(channelName && (
          <p className="channel-handle h-10">
            @{channelName.replace(/\s+/g, '').toLowerCase()}
          </p>
        )) || <p className="h-10"></p>}

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

      {/* For uploading image */}
      <div>
        <p className="file-info">Upload a 2x3 aspect ratio banner</p>
        <div className="input-container">
          <input type="file" name="channelBanner" accept="image/*" />
        </div>
      </div>

      <div>
        <div className="input-container">
          <textarea
            name="description"
            placeholder="Enter a channel description (max 10 characters)"
            required
            maxLength={80}
          />
        </div>
      </div>

      <label>
        <input type="checkbox" name="confirmChannel" required /> I confirm the
        channel creation
      </label>
    </>
  );
};
