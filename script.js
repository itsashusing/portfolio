 // Helpers
        const cursor = document.getElementById('cursor');
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Parallax on mousemove for hero visual
        const parallax = document.getElementById('parallax');
        const scene = document.getElementById('scene');
        document.addEventListener('mousemove', (e) => {
            const w = window.innerWidth, h = window.innerHeight;
            const cx = w / 2, cy = h / 2;
            const dx = (e.clientX - cx) / cx; // -1..1
            const dy = (e.clientY - cy) / cy;
            // move layers
            document.querySelectorAll('#parallax .layer').forEach(layer => {
                const depth = parseFloat(layer.getAttribute('data-depth')) || 0.05;
                layer.style.transform = `translate3d(${dx * depth * 60}px, ${dy * depth * 40}px, 0)`;
            });
            // subtle tilt of scene
            scene.style.transform = `perspective(1000px) rotateY(${dx * 6}deg) rotateX(${-dy * 4}deg) translateZ(0)`;
        });

        // Card tilt effect for project cards
        document.querySelectorAll('.project').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                const px = (x / rect.width) - 0.5; const py = (y / rect.height) - 0.5;
                card.style.transform = `translateY(-8px) rotateX(${-py * 8}deg) rotateY(${px * 8}deg)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = '' });
        });

        // Scroll reveal
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('show'); }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('[data-anim], .fade-in').forEach(el => observer.observe(el));

        // small helpers
        function scrollToSection(id) { document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        function copyEmail() { navigator.clipboard.writeText('ashutoshprofile@gmail.com').then(() => { alert('Email copied to clipboard!'); }).catch(() => { alert('Could not copy — please copy manually.') }); }
        function openProject(id) {
            const projects = {
                1: { title: 'Multi-Tenant SaaS (Practice)', desc: 'Tenant isolation, middleware & per-tenant DB connections. Tech: Laravel, MySQL, Redis.' },
                2: { title: 'Image Upload & Storage Service', desc: 'Secure uploads + temporary URL generation (S3/DigitalOcean). Tech: Laravel, Queue, Workers.' },
                3: { title: 'Job Board Platform', desc: 'Search, dashboards & secure applicant flows. Tech: Laravel, MySQL, ElasticSearch (demo).' }
            };
            const p = projects[id];
            const html = `<strong>${p.title}</strong>

${p.desc}

(Links & repo available on request)`;
            alert(html);
        }

        // Reduce motion prefers
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.project, .hero-visual, .scene').forEach(el => el.style.transition = 'none');
        }