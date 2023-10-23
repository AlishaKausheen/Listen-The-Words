const video = document.querySelector(`video`);
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
      let img = canvas.getContext(`2d`).drawImage(video, 0, 0, video.width, video.height); //the image that will be used for reading
      const {
        data: { text },
      } = await worker.recognize(img,`eng`);
      console.log(text);
      await worker.terminate();
    });
  });
}
setUp();
