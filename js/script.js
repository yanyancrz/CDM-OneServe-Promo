// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// FAQ ACCORDION

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {
            if (faq !== item) {
                faq.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});

// ACTIVE NAVIGATION LINKS

const sections = document.querySelectorAll("section");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navAnchors.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }

    });

});

// MOBILE DEVICE CHECK

const isMobile =
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

if (!isMobile) {

    document.body.innerHTML = `
        <div style="
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            height:100vh;
            text-align:center;
            padding:20px;
            font-family:Arial, sans-serif;
            background:#0f172a;
            color:white;
        ">
            <h1>Mobile Device Required</h1>

            <p>
                The CDM OneServe Student Portal is designed
                exclusively for mobile devices.
            </p>

            <p>
                Please access this portal using your smartphone.
            </p>
        </div>
    `;
}