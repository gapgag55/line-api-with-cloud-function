const textMessage = (text) => ({
  type: 'text',
  text,
});

const imageMessage = (originalContentUrl, previewImageUrl) => ({
  type: "image",
  originalContentUrl,
  previewImageUrl
});

const videoMessage = (originalContentUrl, previewImageUrl) => ({
  type: "video",
  originalContentUrl,
  previewImageUrl
});

const audioMessage = (originalContentUrl, duration) => ({
  type: "audio",
  originalContentUrl,
  duration
});

const locationMessage = (title, address, latitude, longitude) => ({
  type: "location",
  title,
  address,
  latitude,
  longitude
});

//....

module.exports = ({
  textMessage,
  imageMessage,
  videoMessage,
  audioMessage,
  locationMessage
});