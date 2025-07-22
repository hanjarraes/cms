import { useEffect, useRef, useState } from "react";
import { dummyQuestions } from "./main-page.dummy";
import { useModal } from "component/modal/modal.service";
import * as blazeface from "@tensorflow-models/blazeface";
import "@tensorflow/tfjs";

const useMainPages = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isUserPresent, setIsUserPresent] = useState(false);
    const [answers, setAnswers] = useState<{ [key: number]: any }>({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasCaptured, setHasCaptured] = useState(false);
    const currentQuestion = dummyQuestions[currentIndex];
    const [timeLeft, setTimeLeft] = useState<number>(5000);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const modalWarning = useModal()

    const handleNext = () => {
        if (currentIndex < dummyQuestions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, type } = event.target;

        // Type assertion untuk input checkbox
        const isChecked = (event.target as HTMLInputElement).checked;

        setAnswers((prev) => ({
            ...prev,
            [currentIndex]: type === "checkbox"
                ? isChecked
                    ? [...(prev[currentIndex] || []), value]
                    : (prev[currentIndex] || []).filter((v: string) => v !== value)
                : value
        }));
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAnswers((prev) => ({
                ...prev,
                [currentIndex]: {
                    filename: file.name,
                    fileUrl: URL.createObjectURL(file)
                }
            }));
        }
    };
    const handleFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    };

    // Fungsi untuk format HH:MM:SS
    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };


    // //useEffect
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    useEffect(() => {
        const handleMouseOut = (event: MouseEvent) => {
            if (!event.relatedTarget) {
                modalWarning.openModalHandling();
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                modalWarning.openModalHandling();
            }
        };

        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("mouseout", handleMouseOut);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        // Disable right-click
        const disableRightClick = (event: MouseEvent) => {
            event.preventDefault();
        };

        // Disable F11 (Fullscreen) & F12 (DevTools)
        const disableKeys = (event: KeyboardEvent) => {
            if (event.key === "F12" || event.key === "F11") {
                event.preventDefault();
            }
        };

        document.addEventListener("contextmenu", disableRightClick);
        document.addEventListener("keydown", disableKeys);

        return () => {
            document.removeEventListener("contextmenu", disableRightClick);
            document.removeEventListener("keydown", disableKeys);
        };
    }, []);


    useEffect(() => {
        let interval: NodeJS.Timeout;
        let model: blazeface.BlazeFaceModel | null = null;
        let stream: MediaStream | null = null;

        const startFaceDetection = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                model = await blazeface.load();

                interval = setInterval(async () => {
                    if (videoRef.current && model) {
                        const faces = await model.estimateFaces(videoRef.current, false);
                        const detectedFaces = faces.filter(face => {
                            if (face.probability && Array.isArray(face.probability)) {
                                return face.probability[0] > 0.8;
                            }
                            return false;
                        });

                        console.log("Detected faces:", detectedFaces.length);
                        setIsUserPresent(detectedFaces.length > 0);

                        // Jika tidak ada user, capture dan simpan foto
                        if (detectedFaces.length === 0) {
                            captureImage();
                        }
                    }
                }, 1000);
            } catch (error) {
                console.error("Error accessing webcam or loading model:", error);
            }
        };

        startFaceDetection();

        return () => {
            clearInterval(interval);
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        let model: blazeface.BlazeFaceModel | null = null;
        let stream: MediaStream | null = null;

        const startFaceDetection = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }

                model = await blazeface.load();

                interval = setInterval(async () => {
                    if (videoRef.current && model) {
                        const faces = await model.estimateFaces(videoRef.current, false);
                        console.log("Detected faces:", faces.length);
                        setIsUserPresent(faces.length > 0);

                        // Jika tidak ada user dan belum pernah capture, maka capture
                        if (faces.length === 0 && canvasRef.current && !hasCaptured) {
                            captureImage();
                            setHasCaptured(true); // ✅ Tandai sudah pernah capture
                        }

                        // Reset capture jika user kembali
                        if (faces.length > 0) {
                            setHasCaptured(false);
                        }
                    }
                }, 1000);
            } catch (error) {
                console.error("Error accessing webcam or loading model:", error);
            }
        };

        startFaceDetection();

        return () => {
            clearInterval(interval);
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [hasCaptured]); // ✅ Pastikan dependensinya include `hasCaptured`

    // Function untuk menangkap gambar dari video dan menyimpannya
    const captureImage = () => {
        console.log("Capturing image...", videoRef.current, canvasRef.current);

        if (!videoRef.current || !canvasRef.current) {
            console.warn("⚠️ Video or Canvas not ready!");
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Simpan gambar ke local dengan Blob URL
        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `no_user_detected_${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                console.log("📸 Captured and saved image!");
            }
        }, "image/png");
    };

    return {
        answers,
        currentIndex,
        currentQuestion,
        modalWarning,
        isUserPresent,
        videoRef,
        canvasRef,
        timeLeft,
        setIsRunning,
        formatTime,
        handleFullscreen,
        handleFileChange,
        handleChange,
        handlePrevious,
        setCurrentIndex,
        handleNext,
    }
}

export default useMainPages
