//index page accordion 
window.onload = function () {
   $("#accordion").accordion();
};

//index page image slideshow
var myImage = document.getElementById("mainImage");

var imageArray = ["images/bikeCleaning.gif","images/bycicleHealth.jpg","images/friendsBycicle.jpg","images/melbourneBikes.gif","images/mountainBike.jpg"];                                     
var imageIndex = 0;

function changeImage() {
    myImage.setAttribute("src",imageArray[imageIndex]);
    imageIndex++;
    if (imageIndex >= imageArray.length) {
        imageIndex = 0;
}
}
setInterval(changeImage,5000);


