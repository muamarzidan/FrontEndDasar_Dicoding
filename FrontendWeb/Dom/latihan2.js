document.addEventListener('DOMContentLoaded', function() {
    //megecek perbedaan jika innerText dan innerHTML
    const links = document.getElementById('links');
    links.innerText;
    links.innerHTML;
    //megecek jika innerText
    const dicoding = document.getElementById('dicodingLink');
    dicoding.innerText = 'UpdateDicoding';
    //megecek jika innerHTML
    const google = document.getElementById('googleLink');
    google.innerHTML = '<i></i>UpdateGoogle</i>';
    //mencoba manipulasi tag dengan style property
    const button = document.getElementsByClassName('button');
    for (const btns of button) {
        console.log(btns.children[0]);
        btns.children[0].style.borderRadius = '6px';
    }
});