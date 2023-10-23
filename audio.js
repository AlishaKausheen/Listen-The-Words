const video = document.querySelector(`video`);
const textElem = document.querySelector('[data-text]');
async function setUp() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.addEventListener(`playing`, async () => {
    const worker = await Tesseract.createWorker();

    // await worker.load();
    // await worker.loadLanguage(`eng`);
    //await worker.initialize(`eng`);

    const canvas = document.createElement(`canvas`);
    canvas.width = video.width;
    canvas.height = video.height;
    document.addEventListener(`keypress`, async (e) => {
      if (e.code != `Enter`) return;
      const img = canvas.getContext(`2d`)
      img.drawImage(video, 0, 0, canvas.width, canvas.height); //the image that will be used for reading
      const imageData = img.getImageData(0, 0, canvas.width, canvas.height);
      const {
        data: { text }, } = await worker.recognize(imageData,'eng');
      textElem.textContent = text;
      
    });
  });
}
setUp();
