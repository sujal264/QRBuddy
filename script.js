let imgBox = document.getElementById('imgBox');
let qrImage = document.getElementById('qrImage');
let qrText = document.getElementById('qrText');

function generateQR() {
    if(qrText.value.length > 0) {
    qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+ qrText.value;
    imgBox.classList.add('show-img');
    }else {
        alert('Please enter a Some valid Text or URL');
    }
}

const video = document.getElementById('preview');
const output = document.getElementById('output');

// Function to initialize webcam
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = stream;
        video.setAttribute("playsinline", true); // For iOS compatibility
        video.play();
        requestAnimationFrame(scanQRCode);
    } catch (err) {
        console.error("Error accessing camera: ", err);
        alert("Camera not accessible!");
    }
}

// Function to scan QR Code
function scanQRCode() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
        output.textContent = `QR Code Data: ${code.data}`;
        console.log(`QR Code Data: ${code.data}`);
    } else {
        requestAnimationFrame(scanQRCode);
    }
}

// Start camera on page load
startCamera();
