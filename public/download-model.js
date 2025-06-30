// Script to download your model from Google Drive
// Run this in the browser console or use curl command from README

const downloadModel = async () => {
  try {
    console.log('🔄 Downloading your emotion_model.onnx...');
    
    const response = await fetch('https://drive.google.com/uc?export=download&id=13RXxOlOLkMox8Ehqct8EE3l84qrYM-RB');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emotion_model.onnx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    console.log('✅ Model downloaded successfully!');
  } catch (error) {
    console.error('❌ Download failed:', error);
  }
};

// Uncomment to run automatically
// downloadModel();