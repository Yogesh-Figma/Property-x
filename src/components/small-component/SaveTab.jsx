import React ,{useState}from 'react';
import apiServiceInstance from '../../Api/ApiService';

const SaveTab = ({  onClose, url ,refreshData }) => {
  // const { addSavedURL } = useSavedURL();
  const [bookname , setbookName] = useState('');
  const userId = localStorage.getItem('userId');


  // useEffect(() => {
  //   const response = apiServiceInstance.getSavedURLs(userId , );
  //   console.log(response);
  // }, []);

  // useefect(() => {
  // const  response = apiServiceInstance.saveBookmark(userId,name,url);
  // }, []);

  const handleNameChange = (e) => {
    setbookName(e.target.value);
  };
console.log(url,'utyugjgg');
  const handleSaveClick = async () => {
    try {
      // Use the input value in the API call
      console.log(url,'fdvbn');
      const response = await apiServiceInstance.saveBookmark( userId ,bookname, url);
      console.log('Tab saved successfully:', response);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error saving tab:', error);
    }
  };
  // const handleSaveAndClose = () => {
  //   if (name && url) {
  //     addSavedURL(name, url);
  //     handleSave(); // Optional: if you want to perform additional save operations
  //     onClose(); 
  //   } else {
  //     alert("Please enter a valid name and URL.");
  //   }
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-indigo-600"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7h18" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Save as Tab</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="tabName" className="text-lg font-medium text-gray-700">
              Tab Name
            </label>
            <input
              id="tabName"
              type="text"
              placeholder="Enter tab name"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={bookname}
              onChange={handleNameChange}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={handleSaveClick}
            >
              Save as tab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveTab;
