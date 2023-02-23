import React, { useState } from 'react';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image_file', file);

    file && setLoading(true);
    fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': 'QxZVNZsoEeMZDYHhxaQJHeSr',
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to remove background');
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setResultUrl(url);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className='section'>
      <h1 className='title'>Remove background</h1>
      <div className='upload'>
        <div class='upload-container'>
          <input type='file' id='file-input' onChange={handleImageUpload} />
          <label for='file-input'>
            <i class='fas fa-upload'></i>
            <span>Rasm yuklang</span>
          </label>
        </div>
      </div>
      <div className='result'>
        {loading ? (
          <h1>Yuklanmoqda...</h1>
        ) : (
          resultUrl && (
            <div className='result_inner'>
              <img src={resultUrl} alt='Result' />
              <a href={resultUrl} download>
                Yuklab olish
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
