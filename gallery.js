import galleryImages from "./gallery-items.js";

const refs = {
  gallery: document.querySelector(".js-gallery"),
  modal: document.querySelector(".js-lightbox"),
  modalImage: document.querySelector("img.lightbox__image"),
  closeModal: document.querySelector(`[data-action = "close-lightbox"]`),
  modalOverlay: document.querySelector("div.lightbox__overlay"),
};

const createGalleryItemList = (array) =>
    array.map(({ preview, original, description }) => {
        return `
        <li class="gallery__item">
            <a class="gallery__link" href = '${original}'>
                <img class="gallery__image" src ='${preview}' data-source = '${original}' alt = '${description}'/>
            </a>
        </li>`
    }).join('');

refs.gallery.insertAdjacentHTML ('afterbegin', createGalleryItemList(galleryImages));

const onOpenModal = (e) => {
    if (!e.target.classList.contains('gallery__image')) {
        return;
    };
    e.preventDefault();

    refs.modal.classList.add('is-open');
    const currentImageRef = e.target.dataset.source;
    const currentAltRef = e.target.alt;
    
    refs.modalImage.src = `${currentImageRef}`;
    refs.modalImage.alt = `${currentAltRef}`;

    window.addEventListener('keydown', onEscapePress)
}

refs.gallery.addEventListener('click', onOpenModal);

const onCloseModal = () => {
    refs.modal.classList.remove('is-open');
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
    window.removeEventListener('keydown', onEscapePress)
};

refs.closeModal.addEventListener('click', onCloseModal);

const onOverlayClick = (e) => {
    if (e.target === refs.modalOverlay) {
        onCloseModal();
    }
}

refs.modalOverlay.addEventListener('click', onOverlayClick);

const onEscapePress = (e) => {
    if (e.code === 'Escape') {
        onCloseModal();
    }
}