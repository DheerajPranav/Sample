  

// $(document).on('change', '#image-selector', function() {
$("#image-selector").change(function () {
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();
    }
    let file = $("#image-selector").prop("files")[0];
    reader.readAsDataURL(file);
});

$("#model-selector").change(function () {
    loadModel($("#model-selector").val());
});


const saveLocation = 'http://localhost:81/tjfs/Resnet101img';



let model 
async function loadModel(name) {
	
	$(".progress-bar").show();
	model = await tf.loadModel(saveLocation + '/model.json');
    $(".progress-bar").hide();
}
let predictions
$("#predict-button").click(async function () {
    let image = $("#selected-image").get(0);
    
    let tensor = tf.fromPixels(image)
    .resizeNearestNeighbor([224,224])
    .toFloat()
    .expandDims();
        
        
	
	
	predictions = await model.predict(tensor).data();
    let top5 = Array.from(predictions)
        .map(function (p, i) {
            return {
                probability: p,
                className: CANCER_CLASSES[i]
            };
        }).sort(function(a, b){
            return b.probability - a.probability;

        }).slice(0, 1)

        

    $("#prediction-list").empty();
    
    top5.forEach(function (p) {
        
        $("#prediction-list").append(`I think there is a ${(p.probability.toFixed(6))*100}% chance that it is a ${p.className}!`);
    });
});

