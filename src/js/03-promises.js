import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button'),
};
refs.form.classList.add('style-form-promises');
refs.delay.classList.add('style-input-promises');
refs.step.classList.add('style-input-promises');
refs.amount.classList.add('style-input-promises');
refs.submitBtn.classList.add('griate-promises-btn');
refs.submitBtn.addEventListener('click', result);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function result(event) {
  event.preventDefault();
  const firstDelay = Number(refs.delay.value);
  const stepDelay = refs.step.value;
  const amount = refs.amount.value;
  let delay = firstDelay;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay = firstDelay + stepDelay * position;
  }
}
