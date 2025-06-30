# 🚀 Deployment Guide for GeoSentioMap

## Prerequisites
- Your `emotion_model.onnx` file downloaded and placed in `public/` folder
- Project built successfully with `npm run build`

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

#### Method A: Drag & Drop
1. Build your project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to Netlify
4. Your site will be live instantly!

#### Method B: Git Integration
1. Push your code to GitHub (including the model file)
2. Connect Netlify to your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy automatically on every push

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Your site will be deployed with a custom URL

### Option 3: GitHub Pages

1. Build: `npm run build`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to package.json scripts:
   ```json
   "deploy": "gh-pages -d dist"
   ```
4. Run: `npm run deploy`

### Option 4: Firebase Hosting

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Set public directory to `dist`
5. Deploy: `firebase deploy`

## 📁 Important Files for Deployment

Make sure these files are included in your deployment:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ort-wasm-*.wasm
└── emotion_model.onnx  ← Your model file (CRITICAL!)
```

## ⚠️ Common Issues

### Model File Missing
- **Problem**: "Failed to load ONNX model" error
- **Solution**: Ensure `emotion_model.onnx` is in the `public/` folder before building

### Large File Size
- **Problem**: Deployment fails due to file size limits
- **Solution**: Some platforms have file size limits. Consider:
  - Model quantization to reduce size
  - Using CDN for model hosting
  - Splitting model into chunks

### CORS Issues
- **Problem**: Model fails to load due to CORS
- **Solution**: Ensure your hosting platform serves WASM files correctly

## 🔧 Build Optimization

### For Production Builds:
```bash
# Clean build
rm -rf dist
npm run build

# Verify model is included
ls -la dist/emotion_model.onnx
```

### Environment Variables (if needed):
```bash
# .env.production
VITE_MODEL_URL=/emotion_model.onnx
VITE_APP_TITLE=GeoSentioMap
```

## 📊 Performance Tips

1. **Enable Gzip**: Most hosting platforms do this automatically
2. **CDN**: Use a CDN for faster global access
3. **Caching**: Set proper cache headers for the model file
4. **Preloading**: The model loads automatically on page load

## 🎯 Testing Your Deployment

1. Open your deployed URL
2. Check browser console for any errors
3. Upload a test image
4. Verify the model status shows "Your Real Model Active"
5. Test emotion prediction functionality

## 📱 Mobile Optimization

Your app is already mobile-responsive, but for better mobile performance:
- Model loads automatically
- Touch-friendly interface
- Responsive design works on all screen sizes

---

**Need help?** Check the browser console for detailed error messages!