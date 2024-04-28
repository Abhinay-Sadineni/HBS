import React, { useState } from "react";

function ImageForm({handleNext ,handlePrevious}) {

    
    const [fetchedImages, setFetchedImages] = useState([{id : 10, imgURL : "http://localhost:5000/hotel1.jpg"}, {id : 20, imgURL :"http://localhost:5000/hotel2.jpg"}, {id : 30, imgURL :"http://localhost:5000/hotel3.jpg"}, {id : 45, imgURL :"http://localhost:5000/hotel4.jpg"}, {id : 59, imgURL :"http://localhost:5000/hotel5.jpg"}])

    const [formData1 ,setFormData1] = useState({
        images: []
    })
    const [imagePopup, setImagePopup] = useState(false);
    const [uploadedimagePopup, setUploadedImagePopup] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentUploadedImageIndex, setCurrentUploadedImageIndex] = useState(0);

    const toggleImagePopup = (index) => {
        setImagePopup(!imagePopup);
        setCurrentImageIndex(index);
    };



    const toggleUploadedImagePopup = (index) => {
        setUploadedImagePopup(!uploadedimagePopup);
        setCurrentUploadedImageIndex(index);
    };





    const showNextImage = () => {
        const nextIndex = (currentImageIndex + 1) % fetchedImages.length;
        setCurrentImageIndex(nextIndex);
    };

    const showNextUploadedImage = () =>{
        const nextIndex = (currentUploadedImageIndex + 1) % formData1.images.length;
            setCurrentUploadedImageIndex(nextIndex)

    }

    const showPreviousImage = () => {
        const previousIndex = (currentImageIndex - 1 + fetchedImages.length) % fetchedImages.length;
        setCurrentImageIndex(previousIndex);
    };

    const showPreviousUploadedImage = () => {
        const previousIndex = (currentUploadedImageIndex - 1 + formData1.images.length) % formData1.images.length;
        setCurrentUploadedImageIndex(previousIndex)
}

        const handleImageUpload = (e) => {
            const files = Array.from(e.target.files);
            setFormData1({
                ...formData1,
                images: files
            });
        };

    const handleImageDelete = (id) => {
        
        const index = fetchedImages.findIndex(image => image.id === id);
        if(index != -1){
            const updatedImages = [...fetchedImages];
            updatedImages.splice(index, 1);
            setFetchedImages(updatedImages)
        }
        
    };

    const handleUpoadedImageDelete = (index) => {
        const updatedImages = [...formData1.images];
        updatedImages.splice(index, 1);
        setFormData1({
            ...formData1,
            images: updatedImages
        });

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData1)
    };

    

    return (
                <div className="grid grid-cols-2 gap-8 w-full max-w-4xl p-8 bg-white rounded-lg shadow-md">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <p>Upload Images:</p>
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="border border-gray-300 rounded-md px-4 py-2" />
                            {/* Display submitted images */}
                            {fetchedImages.length > 0 && (
                                <div>
                                    <p>Images Present:</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {fetchedImages.map((image, index) => (
                                            <div key={image.id} className="relative">
                                            <img src={image.imgURL} alt={`Image ${image.id}`} className="w-20 h-20 object-cover rounded-md" onClick={() => toggleImagePopup(index)} />
                                            {/* Minus button for deleting image */}
                                            <button onClick={() => handleImageDelete(image.id)} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">
                                                -
                                            </button>
                                        </div>
                                        ))}
                                    </div>
                                    {imagePopup && (
                                        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                                            <div className="bg-white p-8 rounded-lg overflow-y-auto max-h-full relative" style={{ width: '80%' }}>
                                                <button onClick={() => setImagePopup(false)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800">
                                                    &#x2715;
                                                </button>
                                                <button onClick={showPreviousImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l-md">
                                                    &lt;
                                                </button>
                                                <button onClick={showNextImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-md">
                                                    &gt;
                                                </button>
                                                <img src={fetchedImages[currentImageIndex].imgURL} alt={`Image ${currentImageIndex}`} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {formData1.images.length > 0 && (
                                <div>
                                    <p>Uploaded Images:</p>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {formData1.images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <img  src={URL.createObjectURL(image)} alt={`Image ${index}`} className="w-20 h-20 object-cover rounded-md" onClick={() => toggleUploadedImagePopup(index)} />
                                                <button onClick={() => handleUpoadedImageDelete(index)} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full">
                                                    -
                                                </button>
                                            </div>
                                        ))}
                                        

                                    </div>
                                    {uploadedimagePopup && (
                                        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
                                            <div className="bg-white p-8 rounded-lg overflow-y-auto max-h-full relative" style={{ width: '80%' }}>
                                                <button onClick={() => setUploadedImagePopup(false)} className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800">
                                                    &#x2715;
                                                </button>
                                                <button onClick={showPreviousUploadedImage} className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l-md">
                                                    &lt;
                                                </button>
                                                <button onClick={showNextUploadedImage} className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-md">
                                                    &gt;
                                                </button>
                                                <img src={URL.createObjectURL(formData1.images[currentUploadedImageIndex])} alt={`Image ${currentImageIndex}`} />
                                            </div>
                                        </div>
                                    )} 
                                </div>
                            )}
                            
                        </div>
                        <button onClick={(e) => handlePrevious(e)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">Previous</button>
                        <button onClick={(e) => handleNext(e)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Next</button>
                    </form>
                </div>
            )

}

export default ImageForm;
