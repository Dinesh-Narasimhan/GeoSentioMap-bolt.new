#!/bin/bash

echo "🚀 Setting up GeoSentioMap with your real AI model..."

# Create public directory if it doesn't exist
mkdir -p public

# Download your trained model from Google Drive
echo "📥 Downloading your emotion_model.onnx..."
curl -L "https://drive.google.com/uc?export=download&id=13RXxOlOLkMox8Ehqct8EE3l84qrYM-RB" -o public/emotion_model.onnx

# Check if download was successful
if [ -f "public/emotion_model.onnx" ]; then
    echo "✅ Model downloaded successfully!"
    echo "📊 Model size: $(du -h public/emotion_model.onnx | cut -f1)"
else
    echo "❌ Model download failed!"
    echo "Please manually download from: https://drive.google.com/file/d/13RXxOlOLkMox8Ehqct8EE3l84qrYM-RB/view"
    echo "And place it in the public/ folder as emotion_model.onnx"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy ONNX Runtime WASM files to public directory
echo "📋 Copying ONNX Runtime WASM files..."
if [ -d "node_modules/onnxruntime-web/dist" ]; then
    cp node_modules/onnxruntime-web/dist/*.wasm public/ 2>/dev/null || echo "⚠️  WASM files not found in expected location"
    echo "✅ WASM files copied to public directory"
else
    echo "⚠️  ONNX Runtime not found in node_modules. WASM files will be downloaded on first run."
fi

echo "🎉 Setup complete! Run 'npm run dev' to start the development server."