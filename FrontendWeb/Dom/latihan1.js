document.addEventListener('DOMContentLoaded', function() {
    const gambar = document.getElementById('gambar');
    gambar.setAttribute('width', 300);
    gambar.setAttribute('height', 215);

    const allButton = document.querySelectorAll('.button');
    console.log(allButton);
    const playButton = allButton[3]; 
    console.log(playButton);
    const playButtonElement = playButton.children[0];
    console.log(playButtonElement); 
    playButtonElement.setAttribute('type', 'submit');
});
