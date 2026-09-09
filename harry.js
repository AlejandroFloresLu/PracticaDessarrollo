const harryMilestones = {
  1991: {
    number: "01",
    label: "El comienzo",
    title: "La Piedra Filosofal",
    copy: "Descubre que es un mago, entra a Hogwarts, es seleccionado en Gryffindor, forja su amistad con Ron y Hermione, y frustra el primer intento de retorno de Voldemort."
  },
  1992: {
    number: "02",
    label: "La herencia de Slytherin",
    title: "La Cámara Secreta",
    copy: "Abre la cámara secreta, se enfrenta al basilisco y destruye el diario de Tom Riddle, el cual más adelante descubriría que fue el primer Horrocrux destruido."
  },
  1994: {
    number: "03",
    label: "El retorno oscuro",
    title: "El Torneo Mágico",
    copy: "Participa de forma inesperada en el Torneo de los Tres Magos, superando dragones y laberintos, solo para presenciar el trágico retorno al poder de Lord Voldemort."
  },
  1998: {
    number: "04",
    label: "El destino final",
    title: "Batalla de Hogwarts",
    copy: "La épica conclusión donde se sacrificó a sí mismo para destruir el Horrocrux en su interior, logrando finalmente derrotar a Voldemort y traer paz al Mundo Mágico."
  }
};

const harryTimelineList = document.querySelector(".harry-timeline");
const harryTimelineItems = Array.from(document.querySelectorAll(".harry-timeline-item"));
const harryDetailNumber = document.querySelector(".harry-detail-number");
const harryDetailLabel = document.querySelector(".harry-detail-label");
const harryDetailTitle = document.querySelector("#harry-milestone-title");
const harryDetailCopy = document.querySelector("#harry-milestone-copy");
const harryMilestonePanel = document.querySelector("#harry-milestone-panel");

if (harryTimelineList && harryTimelineItems.length) {
  const selectHarryMilestone = (item, { moveFocus = false } = {}) => {
    const milestone = harryMilestones[item.dataset.year];

    harryTimelineItems.forEach((timelineItem) => {
      const selected = timelineItem === item;
      timelineItem.classList.toggle("active", selected);
      timelineItem.setAttribute("aria-selected", String(selected));
      timelineItem.tabIndex = selected ? 0 : -1;
    });

    harryDetailNumber.textContent = milestone.number;
    harryDetailLabel.textContent = milestone.label;
    harryDetailTitle.textContent = milestone.title;
    harryDetailCopy.textContent = milestone.copy;
    harryMilestonePanel.setAttribute("aria-labelledby", item.id);

    if (moveFocus) item.focus();
  };

  harryTimelineItems.forEach((item) => {
    item.addEventListener("click", () => selectHarryMilestone(item));
  });

  harryTimelineList.addEventListener("keydown", (event) => {
    const currentIndex = harryTimelineItems.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let targetIndex = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        targetIndex = (currentIndex + 1) % harryTimelineItems.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        targetIndex = (currentIndex - 1 + harryTimelineItems.length) % harryTimelineItems.length;
        break;
      case "Home":
        targetIndex = 0;
        break;
      case "End":
        targetIndex = harryTimelineItems.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectHarryMilestone(harryTimelineItems[targetIndex], { moveFocus: true });
  });
}
