import * as React from 'react';

export interface IFileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  file: File | null;
  setFile: (file: File | null) => void;
}

export default function FileUpload({ file, setFile, ...props }: IFileUploadProps) {
  // handleFileChange function
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }

  // file remove function
  function handleRemoveFile() {
    setFile(null);
  }

  if (file) {
    return (
      <div {...props} className={props?.className + ' ' + 'h-auto rounded-md border my-auto bg-[#F5F7FB] py-4 px-2'}>
        <div className="flex items-center justify-between">
          <span className="truncate pr-3 text-base font-medium text-[#07074D]">
            <div>{file.name}</div>
          </span>
          <button onClick={handleRemoveFile} className="text-[#07074D]">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className="relative mt-5 h-[6px] w-full bg-[#E2E5EF]">
          <div className="absolute left-0 right-0 h-full  bg-red-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div {...props} className={props?.className + ' ' + ''}>
      <label
        htmlFor="dropzone-file"
        className="mx-auto my-auto cursor-pointer flex w-full max-w-lg flex-col items-center border-y-2 border-dashed border-gray-400 bg-white p-6 text-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>

        <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">Payment File</h2>

        <p className="mt-2 text-gray-500 tracking-wide">Upload or darg & drop your file. </p>

        <input id="dropzone-file" type="file" accept=".docx" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
}
