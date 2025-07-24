const reMapSrc = document.getElementById('reMap');
document.querySelector('.btn-one-diller').addEventListener('click', btnClickOne);
document.querySelector('.btn-two-diller').addEventListener('click', btnClickTwo);
document.querySelector('.btn-three-diller').addEventListener('click', btnClickThree);
document.querySelector('.btn-four-diller').addEventListener('click', btnClickFour);

const reqBottomLeft_subtitle = document.querySelector('.requisites__bottom-left .subtitle');
const reqBottomLeft_text = document.getElementById('req_text');
const reqBottomLeft_time = document.getElementById('req_time');


function btnClickOne(event) {
    event.preventDefault();
    reqBottomLeft_subtitle.innerHTML = 'Контакты ООО "Фрегат"';
    reqBottomLeft_text.innerHTML = 'ул. Вересаева, 111, Тула,<br />Тульская обл.';
    reqBottomLeft_time.innerHTML = 'Понедельник - пятница<br />с 9:00 до 17:00';
    const map = `<iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2334.343609094274!2d37.58417408941452!3d54.19169980175989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x413440706a5b2e3f%3A0xf5ef869a9f7442e1!2z0YPQuy4g0JLQtdGA0LXRgdCw0LXQstCwLCAxMTEsINCi0YPQu9CwLCDQotGD0LvRjNGB0LrQsNGPINC-0LHQuy4sIDMwMDAzNA!5e0!3m2!1sru!2sru!4v1743361199446!5m2!1sru!2sru"
                width="864" height="288" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    reMapSrc.innerHTML = map;
}
function btnClickTwo(event) {
    event.preventDefault();
    reqBottomLeft_subtitle.innerHTML = 'Контакты Дилера г.Тула';
    reqBottomLeft_text.innerHTML = 'ул. Литейная, Тула,<br />Тульская обл.'
    reqBottomLeft_time.innerHTML = 'Понедельник - четверг<br />с 9:00 до 18:00';
    const map = `<iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d874.0637348003596!2d37.619530717445784!3d54.2071634183099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4134409b496e800d%3A0x85554b7f5924485e!2z0YPQuy4g0JvQuNGC0LXQudC90LDRjywg0KLRg9C70LAsINCi0YPQu9GM0YHQutCw0Y8g0L7QsdC7Liwg0KDQvtGB0YHQuNGPLCAzMDAwMDI!5e0!3m2!1sru!2suk!4v1747581534357!5m2!1sru!2suk"
                width="864" height="288" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    reMapSrc.innerHTML = map;
}
function btnClickThree(event) {
    event.preventDefault();
    reqBottomLeft_subtitle.innerHTML = 'Контакты Дилера г.Москва';
    reqBottomLeft_text.innerHTML = 'ул. Марксистская, 24, строение 2, Москва,<br />Московская обл.'
    reqBottomLeft_time.innerHTML = 'Среда - понедельник<br />с 10:00 до 20:00';
    const map = `<iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1123.1314700772398!2d37.661213378798124!3d55.7365602650626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54add1b324435%3A0xc193fc4faa7ed2bf!2z0JzQsNGA0LrRgdC40YHRgtGB0LrQsNGPINGD0LsuLCAyNCDRgdGC0YDQvtC10L3QuNC1IDIsINCc0L7RgdC60LLQsCwg0KDQvtGB0YHQuNGPLCAxMDkxNDc!5e0!3m2!1sru!2suk!4v1747581008646!5m2!1sru!2suk"
                width="864" height="288" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    reMapSrc.innerHTML = map;
}
function btnClickFour(event) {
    event.preventDefault();
    reqBottomLeft_subtitle.innerHTML = 'Контакты Дилера г.Москва';
    reqBottomLeft_text.innerHTML = 'ул. Неглинная, 6/2, Москва,<br />Московская обл.'
    reqBottomLeft_time.innerHTML = 'Понедельник - суббота<br />с 11:00 до 19:00';
    const map = `<iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d943.8724399821718!2d37.62024227740124!3d55.75989811673887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5ca9ae37e3%3A0x6321a00633a5d74c!2z0J3QtdCz0LvQuNC90L3QsNGPINGD0LsuLCA2LzIsINCc0L7RgdC60LLQsCwg0KDQvtGB0YHQuNGPLCAxMDcwMzE!5e0!3m2!1sru!2suk!4v1747581616275!5m2!1sru!2suk"
                width="864" height="288" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>`;
    reMapSrc.innerHTML = map;
}