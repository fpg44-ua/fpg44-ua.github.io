const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {x: null, y: null};

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

document.addEventListener("mousemove", e => {
    mouse.x = e.x;
    mouse.y = e.y;
});

function createParticles() {
    particles = [];
    for(let i=0;i<150;i++){
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            radius: Math.random()*1.5+0.5,
            speedX: (Math.random()-0.5)*0.3,
            speedY: (Math.random()-0.5)*0.3
        });
    }
}
createParticles();

function connectParticles() {
    for(let i=0;i<particles.length;i++){
        for(let j=i;j<particles.length;j++){
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if(dist < 100){
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255,255,255,'+(1-dist/100)+')';
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        // bounce edges
        if(p.x<0 || p.x>canvas.width) p.speedX *= -1;
        if(p.y<0 || p.y>canvas.height) p.speedY *= -1;

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);
        ctx.fillStyle = 'white';
        ctx.fill();

        // react to mouse
        if(mouse.x && mouse.y){
            let dx = p.x - mouse.x;
            let dy = p.y - mouse.y;
            let dist = Math.sqrt(dx*dx+dy*dy);
            if(dist<100){
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(0,255,195,'+(1-dist/100)+')';
                ctx.moveTo(p.x,p.y);
                ctx.lineTo(mouse.x,mouse.y);
                ctx.stroke();
            }
        }
    });
    connectParticles();
    requestAnimationFrame(animate);
}
animate();
