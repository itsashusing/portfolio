AOS.init({ duration: 1000, once: true });

// Matter.js setup
const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Body } = Matter;
const canvas = document.getElementById("skillsCanvas");
canvas.width = window.innerWidth;
canvas.height = document.querySelector('.hero').offsetHeight;

const engine = Engine.create();
const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
        width: canvas.width,
        height: canvas.height,
        wireframes: false,
        background: 'transparent'
    }
});

const w = canvas.width;
const h = canvas.height;

// Walls
const walls = [
    Bodies.rectangle(w / 2, h + 25, w, 50, { isStatic: true }),
    Bodies.rectangle(w / 2, -25, w, 50, { isStatic: true }),
    Bodies.rectangle(-25, h / 2, 50, h, { isStatic: true }),
    Bodies.rectangle(w + 25, h / 2, 50, h, { isStatic: true })
];
Composite.add(engine.world, walls);

// Skills + empty boxes
const skills = ["Laravel", "Laravel", "APIs", "MySQL", "MySQL", "Stripe", "Twilio", "Twilio", "Queues", "Queues", "Jobs", "Events", "RBAC", "AJAX", "Bootstrap", "Bootstrap", "Tailwind", "Service"];
const boxes = [];

skills.forEach(skill => {
    const box = Bodies.rectangle(
        Math.random() * w,
        Math.random() * h,
        80, 80,
        {
            render: {
                fillStyle: 'rgba(13,202,240,0.6)',
                strokeStyle: '#0dcaf0',
                lineWidth: 2
            },
            chamfer: { radius: 12 },
            label: skill
        }
    );
    boxes.push(box);
});

for (let i = 0; i < 30; i++) {
    const emptyBox = Bodies.rectangle(
        Math.random() * w,
        Math.random() * h,
        70, 70,
        {
            render: {
                fillStyle: 'rgba(255,255,255,0.05)',
                strokeStyle: 'rgba(255,255,255,0.2)',
                lineWidth: 1
            },
            chamfer: { radius: 12 },
            label: ""
        }
    );
    boxes.push(emptyBox);
}

Composite.add(engine.world, boxes);

// Initial bounce
setTimeout(() => {
    boxes.forEach(box => {
        Body.setVelocity(box, { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 });
    });
}, 500);

// Mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: { stiffness: 0.2, render: { visible: false } }
});
Composite.add(engine.world, mouseConstraint);
render.mouse = mouse;

// SCROLL FIX — allow mouse wheel to scroll page when over canvas
mouseConstraint.mouse.element.removeEventListener("wheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

// Draw labels on boxes
Matter.Events.on(render, 'afterRender', function () {
    const ctx = render.context;
    ctx.font = 'bold 14px Segoe UI';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    Composite.allBodies(engine.world).forEach(body => {
        if (skills.includes(body.label)) {
            ctx.fillText(body.label, body.position.x, body.position.y);
        }
    });
});

Render.run(render);
Runner.run(Runner.create(), engine);
