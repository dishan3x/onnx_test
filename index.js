
var  load ;
loadModel();
async function loadModel(){
  console.log("waiting");
  const response = fetch('add.onnx');
  console.log("got it");
  console.log(response);
 // const data = await response.text();
 // console.log(data);

}
async function runExample() {
  console.log("working");
  // Create an ONNX inference session with default backend.
  const session = new onnx.InferenceSession();
  console.log("working");
  console.log("https://github.com/Microsoft/onnxjs/issues/58");
  console.log("https://stackoverflow.com/questions/19705972/buffer-entire-file-in-memory-with-nodejs");
  // Load an ONNX model. This model is Resnet50 that takes a 1*3*224*224 image and classifies it.
  var onnxData  = fs.readFile('./add.onnx', 'utf8', function(err, data) {
    if (err) throw err;
    console.log(data);
 });

  await session.loadModel("./add.onnx");
  //await session.loadModel(data);
  console.log("working");
  const x = new Float32Array(3 * 4 * 5).fill(1);
  const y = new Float32Array(3 * 4 * 5).fill(2);
  const tensorX = new onnx.Tensor(x, 'float32', [3, 4, 5]);
  const tensorY = new onnx.Tensor(y, 'float32', [3, 4, 5]);

  // Run model with Tensor inputs and get the result by output name defined in model.
  const outputMap = await session.run([tensorX, tensorY]);
  const outputData = outputMap.get('sum');

  // Check if result is expected.
  const predictions = document.getElementById('predictions');
  if (!outputData.data.every((value) => value === 3)) {
    predictions.innerHTML = `Error: Data mismatch!`;
    return;
  }
  if (outputData.data.length !== 3 * 4 * 5) {
    predictions.innerHTML = `Error: Expected length of ${3 * 4 * 5} but got ${outputData.data.length}`;
    return;
  }
  predictions.innerHTML = `Got an Tensor of size ${outputData.data.length} with all elements being ${outputData.data[0]}`;

}


