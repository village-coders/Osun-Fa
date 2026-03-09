"use client";

import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, Upload, X, CheckCircle } from "lucide-react";

interface PhotoCaptureProps {
    onPhotoCaptured: (file: File) => void;
}

export default function PhotoCapture({ onPhotoCaptured }: PhotoCaptureProps) {
    const webcamRef = useRef<Webcam>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [mode, setMode] = useState<"choose" | "camera" | "preview">("choose");
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);

    // Convert base64 Data URI to a File object so it can easily be put into FormData
    const dataURIToFile = (dataURI: string, filename: string): File => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new File([ab], filename, { type: mimeString });
    };

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setPreviewSrc(imageSrc);
            setMode("preview");

            // Pass the generated File back to the parent form immediately
            const file = dataURIToFile(imageSrc, `webcam_capture_${Date.now()}.jpg`);
            onPhotoCaptured(file);
        }
    }, [webcamRef, onPhotoCaptured]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result as string);
                setMode("preview");
                onPhotoCaptured(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const reset = () => {
        setPreviewSrc(null);
        setMode("choose");
    };

    return (
        <div className="w-full bg-white/5 border border-white/20 rounded-xl p-4 flex flex-col items-center justify-center gap-4 transition-all">
            {mode === "choose" && (
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {/* Upload Option */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600 rounded-xl hover:border-accent hover:bg-accent/10 transition-colors group cursor-pointer"
                    >
                        <Upload className="w-8 h-8 text-gray-400 group-hover:text-accent mb-2" />
                        <span className="text-sm font-medium text-gray-300">Upload Image File</span>
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        title="Upload Photo"
                    />

                    {/* Camera Option */}
                    <button
                        type="button"
                        onClick={() => setMode("camera")}
                        className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-600 rounded-xl hover:border-accent hover:bg-accent/10 transition-colors group cursor-pointer"
                    >
                        <Camera className="w-8 h-8 text-gray-400 group-hover:text-accent mb-2" />
                        <span className="text-sm font-medium text-gray-300">Take Photo</span>
                    </button>
                </div>
            )}

            {mode === "camera" && (
                <div className="w-full h-full flex flex-col items-center">
                    <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-white/20 shadow-lg mb-4">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{ facingMode: "user" }} // Use front camera
                            className="w-full object-cover"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={capture}
                            className="bg-accent text-primary-dark font-bold py-2.5 px-6 rounded-lg hover:bg-secondary transition flex items-center gap-2"
                        >
                            <Camera className="w-4 h-4" /> Capture Photo
                        </button>
                        <button
                            type="button"
                            onClick={reset}
                            className="bg-white/10 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-white/20 transition flex items-center"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {mode === "preview" && previewSrc && (
                <div className="w-full flex flex-col items-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-accent shadow-xl mb-4 group">
                        <img src={previewSrc} alt="Captured Face Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center gap-2 text-green-400 font-medium mb-4">
                        <CheckCircle className="w-5 h-5" />
                        Photo Captured / Uploaded Successfully
                    </div>
                    <button
                        type="button"
                        onClick={reset}
                        className="text-sm text-gray-400 hover:text-white transition flex items-center gap-1.5"
                    >
                        <X className="w-4 h-4" /> Retake or Choose Another
                    </button>
                </div>
            )}
        </div>
    );
}
