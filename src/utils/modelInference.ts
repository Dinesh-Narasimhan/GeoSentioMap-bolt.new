import * as ort from 'onnxruntime-web';

// Configure ONNX Runtime to use local WASM files
ort.env.wasm.wasmPaths = '/';

let session: ort.InferenceSession | null = null;

export const loadModel = async (): Promise<void> => {
  try {
    // Load your emotion_model.onnx file from the public folder
    session = await ort.InferenceSession.create('/emotion_model.onnx');
    console.log('✅ Your real ONNX model loaded successfully!');
  } catch (error) {
    console.error('❌ Failed to load ONNX model:', error);
    throw error;
  }
};

export const preprocessImage = (imageElement: HTMLImageElement): Float32Array => {
  // Create canvas to extract image data
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  
  // Resize to 224x224 (matching your PyTorch model's input size)
  canvas.width = 224;
  canvas.height = 224;
  ctx.drawImage(imageElement, 0, 0, 224, 224);
  
  // Get image data
  const imageData = ctx.getImageData(0, 0, 224, 224);
  const data = imageData.data;
  
  // Convert to RGB and normalize (0-1 range) - matching your PyTorch preprocessing
  const input = new Float32Array(3 * 224 * 224);
  for (let i = 0; i < 224 * 224; i++) {
    // RGB channels (same as torchvision transforms)
    input[i] = data[i * 4] / 255.0;                    // R channel
    input[224 * 224 + i] = data[i * 4 + 1] / 255.0;   // G channel  
    input[2 * 224 * 224 + i] = data[i * 4 + 2] / 255.0; // B channel
  }
  
  return input;
};

export const encodeMetadata = (location: string, weather: string, timeOfDay: string): Float32Array => {
  // Exact same encoding as your PyTorch model
  const locationMap: { [key: string]: number } = { 'kerala': 0, 'chennai': 1 };
  const weatherMap: { [key: string]: number } = { 'sunny': 0, 'rainy': 1, 'cloudy': 2 };
  const timeMap: { [key: string]: number } = { 'morning': 0, 'afternoon': 1, 'evening': 2 };
  
  return new Float32Array([
    locationMap[location] || 0,
    weatherMap[weather] || 0,
    timeMap[timeOfDay] || 0
  ]);
};

export const runInference = async (
  imageElement: HTMLImageElement,
  location: string,
  weather: string,
  timeOfDay: string
): Promise<{ emotion: string; confidence: number; scores: number[] }> => {
  if (!session) {
    throw new Error('Model not loaded. Call loadModel() first.');
  }
  
  try {
    console.log('🔍 Running inference with your real PyTorch model...');
    
    // Preprocess inputs exactly like your PyTorch model expects
    const imageInput = preprocessImage(imageElement);
    const metadataInput = encodeMetadata(location, weather, timeOfDay);
    
    console.log('📊 Input shapes:', {
      image: [1, 3, 224, 224],
      metadata: [1, 3]
    });
    
    // Create tensors with exact same names as your ONNX export
    const imageTensor = new ort.Tensor('float32', imageInput, [1, 3, 224, 224]);
    const metadataTensor = new ort.Tensor('float32', metadataInput, [1, 3]);
    
    // Run inference using your model
    const results = await session.run({
      image: imageTensor,
      metadata: metadataTensor
    });
    
    // Get output scores from your model
    const outputData = results.emotion_scores.data as Float32Array;
    const scores = Array.from(outputData);
    
    console.log('🎯 Raw model outputs:', scores);
    
    // Find predicted class (same as your PyTorch model)
    const maxIndex = scores.indexOf(Math.max(...scores));
    const emotions = ['peaceful', 'neutral', 'energetic', 'chaotic']; // Same order as your training
    const emotion = emotions[maxIndex];
    
    // Calculate confidence using softmax (same as PyTorch)
    const expScores = scores.map(score => Math.exp(score));
    const sumExp = expScores.reduce((a, b) => a + b, 0);
    const probabilities = expScores.map(exp => exp / sumExp);
    const confidence = Math.round(probabilities[maxIndex] * 100);
    
    console.log('✅ Prediction:', { emotion, confidence });
    
    return {
      emotion,
      confidence,
      scores: probabilities
    };
  } catch (error) {
    console.error('❌ Inference failed:', error);
    throw error;
  }
};