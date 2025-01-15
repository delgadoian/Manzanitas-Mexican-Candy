from PIL import Image
import numpy as np

# Load the image
img = Image.open("./Manzanitas_Logo.jpg")

# Convert to numpy array
arr = np.array(img)

# Find the non-white areas
non_white = np.where(arr.min(axis=2) < 255)

# Crop the image
cropped_img = img.crop((non_white[1].min(), non_white[0].min(), non_white[1].max(), non_white[0].max()))

# Save cropped image
cropped_img.save("cropped_image.jpg")

