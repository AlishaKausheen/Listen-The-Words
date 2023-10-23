const video = document.querySelector(`video`);
async function setUp() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}
setUp();
