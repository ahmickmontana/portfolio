if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

    const audioBtn = document.getElementById('audio-btn');
    const audio = document.querySelector('audio');
  
    audioBtn.addEventListener('click', () => {
        const icon = audioBtn.querySelector('i');
        if (icon.classList.contains('bi-volume-off')) {
            playAudio(audio);
            icon.classList.remove('bi-volume-off');
            icon.classList.add('bi-volume-down');
        } else {
            icon.classList.remove('bi-volume-down');
            icon.classList.add('bi-volume-off');
            if (audio) {
                audio.pause();
            }
        }
    });

    document.getElementById('learnMoreBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const expandedSection = document.getElementById('expandedAboutMe');
    const learnMoreBtn = document.getElementById('learnMoreBtn');

    if (expandedSection.style.display === 'none' || expandedSection.style.display === '') {
        expandedSection.style.display = 'block';
        learnMoreBtn.textContent = 'Had Enough Of Me?';
    } else {
        expandedSection.style.display = 'none';
        learnMoreBtn.textContent = 'Learn More About Me!';
    }
  });

  document.getElementById('projectsBtn').addEventListener('click', function(event) {
    event.preventDefault();

    const expandedSection = document.getElementById('expandedProject');
    const projectsBtn = document.getElementById('projectsBtn');

    if (expandedSection.style.display === 'none' || expandedSection.style.display === '') {
        expandedSection.style.display = 'block';
        projectsBtn.textContent = 'Done?';
    } else {
        expandedSection.style.display = 'none';
        projectsBtn.textContent = 'Check My Projects Out!';
    }
  });

});

var playAudio = function(audio) {
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(error => {
        console.warn("Autoplay prevented:", error);
      });
    }
}

if (window.location.hash) {
  window.location.href = 'index.html';
}

function toggleTimeline(header) {
  const content = header.nextElementSibling;
  content.classList.toggle('show');
}

