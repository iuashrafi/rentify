export const BRANDNAME = "Rentify";
export const BACKEND_BASE_URL = "http://localhost:4000";

// aws s3
export const S3_BUCKET_NAME = "roomrent-2";
export const AWS_REGION = "ap-south-1";
const isAwsS3Active = true; // only this will change manually

export const generateImageUrl = (filename) => {
  if (isAwsS3Active)
    return `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${filename}`;
  else {
    // our file will be present locally in uploads/ folder
    return `${BACKEND_BASE_URL}/uploads/${filename}`;
  }
};

export const amenities = [
  "Wifi",
  "Television",
  "Parking",
  "Gymn",
  "Swimming Pool",
  "Refrigerator",
  "Cooking Utensils",
  "Hot water",
  "Shower",
  "Bathtub",
  "AC",
  "Pet Friendly",
  "Private Entrance",
];
