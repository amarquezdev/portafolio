document.addEventListener('DOMContentLoaded', function () {
    const projectTitles = document.querySelectorAll('.project-title');

    projectTitles.forEach(title => {
        title.addEventListener('click', function () {
            const image = this.getAttribute('data-image');
            const description = this.getAttribute('data-description');
            const icons = this.getAttribute('data-icons');

            document.getElementById('projectModalImage').src = image;
            document.getElementById('projectModalTitle').innerText = this.innerText;
            document.getElementById('projectModalDescription').innerText = description;
            document.getElementById('projectModalIcons').innerHTML = icons;

            const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
            projectModal.show();
        });
    });
});
