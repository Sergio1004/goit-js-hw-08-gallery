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
            <a/>
        </li>`
    }).join('');

refs.gallery.insertAdjacentHTML('afterbegin', createGalleryItemList(galleryImages));
