import React, { useState } from "react";
import album1 from "../../../assets/album1.jpg";
import album2 from "../../../assets/album2.jpg";
import album3 from "../../../assets/album3.jpg";
import album4 from "../../../assets/album4.jpg";
import album5 from "../../../assets/album5.jpg";
import album6 from "../../../assets/album6.jpg";

const Gallery = () => {
    const [images, setImages] = useState([
        album1,
        album2,
        album3,
        album4,
        album5,
        album6,
    ]);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images];
                newImages[index] = reader.result;
                setImages(newImages);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative group">
                        <img
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            className="w-full h-full object-cover cursor-pointer rounded-lg transition-transform duration-200 transform group-hover:scale-105"
                            onClick={() =>
                                document
                                    .getElementById(`fileInput-${index}`)
                                    .click()
                            }
                        />

                        <input
                            type="file"
                            id={`fileInput-${index}`}
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(e) => handleImageChange(e, index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
