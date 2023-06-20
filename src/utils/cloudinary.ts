interface CloudinaryResponse {
  secure_url: string;
}

export const uploadFileToCloud = async (file: File) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_KEY || "";
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (response.status === 400) {
    throw new Error("Upload failed");
  }

  const data = (await response.json()) as CloudinaryResponse;
  return data.secure_url;
};
