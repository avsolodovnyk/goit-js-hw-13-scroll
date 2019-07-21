'use strict';
import createMarkup from './createMarkup';
import Masonry from 'masonry-layout';
import infiniteScroll from 'infinite-scroll';
import imagesLoaded from 'imagesloaded';
const refs = {
  targetform: document.querySelector('#js-search-form'),
  targetGallery: document.querySelector('#js-gallery'),

  masonryOptions: {
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    percentPosition: true,
    transitionDuration: '0.3s',
    gutter: '.grid__gutter-sizer',
    stagger: 30,
    visibleStyle: { transform: 'translateY(0)', opacity: 1 },
    hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
  },
  infiniteScrollOptions: {
    path: function getPath() {
      const url = `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=cat&page=${
        this.pageIndex
      }&per_page=12&key=13065886-3f8c1539ec248c8d73efef485`;
      console.log(url);
      return url;
    },
    responseType: 'text',
    history: false,
    append: '.grid__item',
    outlayer: masonryInstance,
    status: '.page-load-status',
  },
};
const masonryInstance = new Masonry('.grid', refs.masonryOptions);

refs.targetform.addEventListener('submit', handelSubmit);
function handelSubmit(event) {
  event.preventDefault();
  const keyword = event.currentTarget.elements[0].value;
  const infScrollInstance = new infiniteScroll(
    refs.targetGallery,
    refs.infiniteScrollOptions,
  );
  const proxyElem = document.createElement('div');
  infScrollInstance.on('load', function(response, url) {
    const data = JSON.parse(response);
    const itemsHTML = data.hits.map(createMarkup).join('');
    proxyElem.innerHTML = itemsHTML;
    const items = proxyElem.querySelectorAll('.photo-card');
    console.log(url);
    imagesLoaded(items, function() {
      infScrollInstance.appendItems(items);
      masonryInstance.appended(items);
    });
  });
  infScrollInstance.loadNextPage();
  infScrollInstance.loadNextPage();
  infScrollInstance.loadNextPage();
}
