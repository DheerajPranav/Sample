function predict() {
    let fileInput = document.getElementById('imageUpload');
    let modelSelect = document.getElementById('modelSelect');
    let resultDisplay = document.getElementById('result');
    
    if (fileInput.files.length === 0) {
        alert("Please upload an image.");
        return;
    }
    
    let formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('model', modelSelect.value);
    
    fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        let resultText = "Prediction:\n";
        for (let key in data) {
            resultText += `${key}: ${(data[key] * 100).toFixed(2)}%\n`;
        }
        resultDisplay.innerText = resultText;
    })
    .catch(error => {
        console.error('Error:', error);
        resultDisplay.innerText = "Error occurred.";
    });
}
