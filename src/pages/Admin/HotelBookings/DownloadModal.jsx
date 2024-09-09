import React from 'react';

const DownloadModal = ({ isOpen, onClose, onDownload }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-md shadow-lg w-64">
        <h2 className="text-xl font-semibold mb-4">Download as</h2>
        <div className="flex justify-around">
          <button onClick={() => onDownload('pdf')} className="bg-yellow-400 text-white px-5 py-2 rounded-md">
            PDF
          </button>
          <button onClick={() => onDownload('excel')} className="bg-yellow-400 text-white px-5 py-2 rounded-md">
            Excel
          </button>
        </div>
        <button onClick={onClose} className="mt-4 text-blue-500">Cancel</button>
      </div>
    </div>
  );
};

export default DownloadModal;
