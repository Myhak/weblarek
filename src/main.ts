import './scss/styles.scss';
// src/main.ts

import { Products } from './components/Models/Products';
import { Basket } from './components/Models/Basket';
import { Buyer } from './components/Models/Buyer';
import { LarekAPI } from './components/API/LarekAPI';
import { Api } from './components/base/Api';
import { API_URL, CDN_URL } from './utils/constants';
import { IProduct } from './types'; 

// === View-компоненты ===
import { Modal } from './components/View/Modal';
import { Gallery } from './components/View/Gallery';
import { CatalogItem } from './components/View/CatalogItem';
import { ModalItem } from './components/View/ModalItem';
import { BasketItem } from './components/View/BasketItem';
import { BasketView } from './components/View/Basket';
import { OrderForm } from './components/View/OrderForm';
import { ContactsForm } from './components/View/ContactsForm';
import { Success } from './components/View/Success';

// === Инициализация моделей ===
const productsModel = new Products();
const basketModel = new Basket();
const buyerModel = new Buyer();

// === Инициализация API ===
const api = new Api(API_URL);
const larekAPI = new LarekAPI(api);

// === Инициализация View ===
const modal = new Modal(document.getElementById('modal-container')!);
const gallery = new Gallery(document.querySelector('.gallery')!);
const basketCounter = document.querySelector('.header__basket-counter')!;
const basketButton = document.querySelector('.header__basket')!;

const basketTemplate = (document.getElementById('basket') as HTMLTemplateElement).content.querySelector('.basket')!;
const successTemplate = (document.getElementById('success') as HTMLTemplateElement).content.querySelector('.order-success')!;

const successView = new Success(successTemplate.cloneNode(true) as HTMLElement, () => {
  modal.close();
  basketModel.clear();
  buyerModel.clear();
});

// === Обработчики событий моделей ===

// Обновление каталога
productsModel.on('products:changed', () => {
  const items = productsModel.getItems().map(item => {
    const template = document.getElementById('card-catalog') as HTMLTemplateElement;
    const cardElement = template.content.querySelector('.card')!.cloneNode(true) as HTMLElement;

    const catalogItem = new CatalogItem(cardElement, () => {
      openModalItem(item);
    });

    catalogItem.id = item.id;
    catalogItem.title = item.title;
    catalogItem.image = CDN_URL + '/' + item.image;
    catalogItem.price = item.price;
    catalogItem.category = item.category;

    return catalogItem.render();
  });

  gallery.items = items;
});

// === Обновление корзины ===
basketModel.on('basket:changed', () => {
  basketCounter.textContent = String(basketModel.getCount());

  // ✅ Используем isOpened() вместо modal.container
  if (modal.isOpened()) {
    renderBasketContent();
  }
});

// === Вспомогательные функции ===

function openModalItem(item: IProduct) {
  const template = document.getElementById('card-preview') as HTMLTemplateElement;
  const modalItemTemplate = template.content.querySelector('.card')!.cloneNode(true) as HTMLElement;

  const inBasket = basketModel.hasItem(item.id);
  const isUnavailable = item.price === null;

  const modalItem = new ModalItem(modalItemTemplate, () => {
    if (isUnavailable) return;

    if (inBasket) {
      basketModel.removeItem(item.id);
    } else {
      basketModel.addItem(item);
    }
    modal.close();
  });

  modalItem.id = item.id;
  modalItem.title = item.title;
  modalItem.image = CDN_URL + '/' + item.image;
  modalItem.price = item.price;
  modalItem.category = item.category;
  modalItem.description = item.description;
  modalItem.buttonLabel = inBasket ? 'Удалить из корзины' : 'Купить';
  modalItem.buttonDisabled = isUnavailable;

  modal.content = modalItem.render();
  modal.open();
}

function renderBasketContent() {
  const basketItems = basketModel.getItems().map((item, index) => {
    const template = document.getElementById('card-basket') as HTMLTemplateElement;
    const basketItemTemplate = template.content.querySelector('.basket__item')!.cloneNode(true) as HTMLElement;

    const basketItem = new BasketItem(basketItemTemplate, () => {
      basketModel.removeItem(item.id);
    });

    basketItem.id = item.id;
    basketItem.index = index + 1;
    basketItem.title = item.title;
    basketItem.price = item.price;

    return basketItem.render();
  });

  const clonedBasket = basketTemplate.cloneNode(true) as HTMLElement;
  const localBasketView = new BasketView(clonedBasket, () => {
    const orderFormTemplate = (document.getElementById('order') as HTMLTemplateElement).content.querySelector('.form')!.cloneNode(true) as HTMLElement;
    const orderForm = new OrderForm(orderFormTemplate, (data) => {
      buyerModel.setPayment(data.payment);
      buyerModel.setAddress(data.address);
      openContactsForm();
    });
    modal.content = orderForm.render();
    modal.open();
  });

  localBasketView.items = basketModel.getItems();
  localBasketView.total = basketModel.getTotal();

  const list = clonedBasket.querySelector('.basket__list')!;
  if (basketModel.getCount() > 0) {
    list.replaceChildren(...basketItems);
  } else {
    list.innerHTML = '<p>Корзина пуста</p>';
  }

  modal.content = clonedBasket;
}

function openContactsForm() {
  const template = document.getElementById('contacts') as HTMLTemplateElement;
  const contactsFormTemplate = template.content.querySelector('.form')!.cloneNode(true) as HTMLElement;

  const contactsForm = new ContactsForm(contactsFormTemplate, (data) => {
    buyerModel.setEmail(data.email);
    buyerModel.setPhone(data.phone);

    try {
      const orderData = buyerModel.getData(); // Может выбросить ошибку, если данные не заполнены
      const order = {
        items: basketModel.getItems().map(item => item.id),
        payment: orderData.payment,
        address: orderData.address,
        email: orderData.email,
        phone: orderData.phone,
      };

      larekAPI.postOrder(order)
        .then(result => {
          successView.total = result.total;
          modal.content = successView.render();
        })
        .catch(err => {
          console.error('Ошибка при оформлении заказа:', err);
          alert('Не удалось оформить заказ. Попробуйте позже.');
        });
    } catch (err) {
      console.error('Ошибка валидации данных покупателя:', err);
      alert('Пожалуйста, заполните все поля.');
    }
  });

  modal.content = contactsForm.render();
  modal.open();
}

// === Обработчики событий UI ===

basketButton.addEventListener('click', () => {
  renderBasketContent();
  modal.open();
});

// === Загрузка данных с сервера ===

larekAPI.getProducts()
  .then(products => {
    productsModel.setItems(products);
  })
  .catch(err => {
    console.error('Ошибка загрузки товаров:', err);
  });