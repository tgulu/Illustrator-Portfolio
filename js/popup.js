
document.querySelectorAll('.photo-grid .image img').forEach(image => {
    image.onclick = () => {
        const popup = document.querySelector('.popup');
        const popupImage = document.querySelector('.popup img');

        popup.style.display = 'block';
        popupImage.src = image.getAttribute('src');
    };
});

document.querySelector('.popup span').onclick = () => {
    document.querySelector('.popup').style.display = 'none';
};