// Scroll animation
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// Toggle Dark / Light
const toggleBtn = document.getElementById("toggleMode");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "🌞" : "🌙";
});
