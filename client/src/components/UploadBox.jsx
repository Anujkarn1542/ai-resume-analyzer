import { useDropzone } from "react-dropzone";

export default function UploadBox({ onFileSelect }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    onDrop: (files) => onFileSelect(files[0]),
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition
        ${
          isDragActive
            ? "border-purple-500 bg-purple-500/10"
            : "border-gray-600 hover:border-purple-400 dark:bg-gray-800"
        }`}
    >
      <input {...getInputProps()} />
      <p className="text-4xl mb-3">📄</p>
      <p className="text-gray-400">Drag & drop your resume PDF here</p>
      <p className="text-sm text-gray-500 mt-1">or click to browse</p>
    </div>
  );
}
