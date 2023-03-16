(function() {
    const expandIcon = document.querySelector('.expand-icon');
    const collapseIcon = document.querySelector('.collapse-icon');
    const links = document.querySelectorAll('.sidebar-link');

    expandIcon.addEventListener('click', () => {
        // remove hidden class from all links:
        links.forEach(link => {
            if (link.classList.contains('hidden')) link.classList.remove('hidden');
        });
        // reveal collapse icon:
        if (collapseIcon.classList.contains('hidden')) collapseIcon.classList.remove('hidden');
        // hide expand icon:
        if (!expandIcon.classList.contains('hidden')) expandIcon.classList.add('hidden');
    });

    collapseIcon.addEventListener('click', () => {
        // add hidden class to all links:
        links.forEach(link => {
            if (!link.classList.contains('hidden')) link.classList.add('hidden');
        });
        // reveal expand icon:
        if (expandIcon.classList.contains('hidden')) expandIcon.classList.remove('hidden');
        // hide collapse icon:
        if (!collapseIcon.classList.contains('hidden')) collapseIcon.classList.add('hidden');
    });
})();