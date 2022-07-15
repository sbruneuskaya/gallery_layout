document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault()

        let error = formValidate(form)
        let formData = new FormData(form)

        if (error === 0) {
            form.classList.add('_sending')
            let response = await fetch('http://send-mail', {
                method: 'POST',
                body: formData,
            })

            if (response.status === 200) {
                console.log(response.status)
                form.reset()
                form.classList.remove('_sending')
                form.classList.add('_success')
            } else {
                form.classList.remove('_sending')
            }
        } else {
            alert("Заполните обязательные поля")
        }
    }

    function formValidate(form) {
        let error = 0
        let formReq = document.querySelectorAll('._req')

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i]
            formRemoveError(input)

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                } else {
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error')
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error')
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
    }
})



// scroll


const menuLinks = document.querySelectorAll('.get-link[data-goto]')

if (menuLinks.length > 0) {
    menuLinks.forEach(el => {
        el.addEventListener('click', onMenuLinkClick)
    })

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        const header = document.querySelector('.header')
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto)
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset


            window.scrollTo({
                top: gotoBlockValue,
                behavior: 'smooth'
            })
            e.preventDefault()
        }
    }
}








const animationBlock = gsap.timeline();

animationBlock.fromTo('.girls', {x: '-100%', y: '100%'}, {y: 0});
animationBlock.fromTo('.book', {x: '-100%'}, {x: '-200%'});
animationBlock.fromTo('.fashion', {x: '-100%'}, {x: '-300%'});
animationBlock.fromTo('.photography', {x: '-500%'}, {x: '-400%'});


const main = document.querySelector('.main');

ScrollTrigger.create({
    animation: animationBlock,
    trigger: '.site-container',
    start: 'top top',
    end: () => main.offsetWidth / 2,
    scrub: true,
    pin: true
})

// description

const description = document.querySelector('.description');




const splitText=(el)=>{
    el.innerHTML = el.textContent.replace(/(\S*)/g, m => {
        return `<div class="word">` +
            m.replace(/(-|#|@)?\S(-|#|@)?/g, "<div class='letter'>$&</div>") +
            `</div>`;
    });
    return el;
}

const split = splitText(description)

function random(min, max){
    return (Math.random() * (max - min)) + min;
}

Array.from(split.querySelectorAll('.letter')).forEach((el, index)=>{



    TweenMax.from(el, 2.5,{
        opacity:0,
        scale: 0.1,
        x: random(-250, 500),
        y: random(-250, 500),
        z: random(-250, 500),
        delay: index * 0.02,
        repeat: 2
    })
})



