Gi# 🧠 GeoSentioMap - AI Emotion Recognition

Your complete AI emotion recognition web application powered by your trained PyTorch model!

## 🚀 Quick Start

### 1. Download Your Model
Download your trained model from Google Drive:
```bash
# Download your emotion_model.onnx file
curl -L "https://drive.google.com/uc?export=download&id=13RXxOlOLkMox8Ehqct8EE3l84qrYM-RB" -o public/emotion_model.onnx
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
├── public/
│   └── emotion_model.onnx          # Your trained ONNX model (download required)
├── src/
│   ├── App.tsx                     # Main application component
│   ├── utils/
│   │   └── modelInference.ts       # ONNX model inference logic
│   └── main.tsx                    # Application entry point
├── backend/
│   └── app.py                      # Original Streamlit version
└── README.md                       # This file
```

## 🎯 Features

- **Real AI Model**: Uses your trained PyTorch model converted to ONNX
- **Context-Aware**: Considers location, weather, and time of day
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Processing**: Runs entirely in the browser
- **Production Ready**: Optimized for deployment

## 🔧 Technical Details

### Model Architecture
- **Base**: ResNet18 feature extractor (512 features)
- **Context**: Location, weather, time encoding (3 features)
- **Classifier**: Combined features → 4 emotion classes
- **Output**: peaceful, neutral, energetic, chaotic

### Input Requirements
- **Images**: 224x224 RGB, normalized 0-1
- **Metadata**: Encoded categorical features
- **Format**: ONNX Runtime Web compatible

## 🌐 Deployment

### Option 1: Netlify (Recommended)
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Make sure `emotion_model.onnx` is in the build

### Option 2: Vercel
1. Connect your GitHub repository
2. Ensure model file is included in build
3. Deploy automatically

### Option 3: GitHub Pages
1. Build: `npm run build`
2. Push `dist` contents to `gh-pages` branch
3. Enable GitHub Pages

## 📊 Model Performance

Your model classifies emotions into 4 categories:
- 🕊️ **Peaceful**: Calm, serene atmospheres
- 👁️ **Neutral**: Balanced emotional states  
- ⚡ **Energetic**: Dynamic, vibrant scenes
- 🌊 **Chaotic**: Complex, intense environments

## 🛠️ Development

### Adding New Features
1. Modify `src/App.tsx` for UI changes
2. Update `src/utils/modelInference.ts` for model logic
3. Test with your model in `public/emotion_model.onnx`

### Model Updates
1. Retrain your PyTorch model
2. Export to ONNX format
3. Replace `public/emotion_model.onnx`
4. Update input/output handling if needed

## 🎨 Customization

### Styling
- Uses Tailwind CSS for styling
- Modify classes in `src/App.tsx`
- Custom colors in emotion configurations

### Model Integration
- Update `modelInference.ts` for different architectures
- Modify preprocessing for different input formats
- Adjust output parsing for different class counts

## 📱 Browser Compatibility

- ✅ Chrome 88+
- ✅ Firefox 90+
- ✅ Safari 14+
- ✅ Edge 88+

Github: https://github.com/Dinesh-Narasimhan/GeoSentioMap-bolt.new

## 🔍 Troubleshooting

### Model Not Loading
- Ensure `emotion_model.onnx` is in `public/` folder
- Check browser console for CORS errors
- Verify model file is not corrupted

### Performance Issues
- Large models may take time to load
- Consider model quantization for faster inference
- Use WebAssembly backend for better performance

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and ONNX Runtime Web**"# bolt" 
