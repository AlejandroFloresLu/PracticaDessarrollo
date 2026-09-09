const bellinghamMilestones = {
  2019: {
    number: "01",
    label: "El origen",
    title: "El niño de Birmingham",
    copy: "Debutó a los 16 años y 38 días, siendo el más joven de la historia del club. Su impacto fue tal que el Birmingham City decidió retirar su camiseta número 22 al ser traspasado."
  },
  2020: {
    number: "02",
    label: "La maduración",
    title: "El muro amarillo",
    copy: "En el Borussia Dortmund se consolidó como uno de los mejores mediocampistas jóvenes del mundo, destacando por su liderazgo, despliegue físico y llegada al área rival."
  },
  2022: {
    number: "03",
    label: "El escenario global",
    title: "Brillando en Qatar",
    copy: "Con la Selección de Inglaterra en la Copa del Mundo, demostró ser un pilar indiscutible, marcando su primer gol en mundiales y siendo la brújula del equipo."
  },
  2023: {
    number: "04",
    label: "La consagración",
    title: "El nuevo rey de Madrid",
    copy: "Llegó al Real Madrid con el peso del número 5 de Zidane. En su primera temporada, redefinió su rol, marcó goles clave en clásicos y levantó la Liga y la Champions League."
  }
};

const bellinghamTimelineList = document.querySelector(".bellingham-timeline");
const bellinghamTimelineItems = Array.from(document.querySelectorAll(".bellingham-timeline-item"));
const bellinghamDetailNumber = document.querySelector(".bellingham-detail-number");
const bellinghamDetailLabel = document.querySelector(".bellingham-detail-label");
const bellinghamDetailTitle = document.querySelector("#bellingham-milestone-title");
const bellinghamDetailCopy = document.querySelector("#bellingham-milestone-copy");
const bellinghamMilestonePanel = document.querySelector("#bellingham-milestone-panel");

if (bellinghamTimelineList && bellinghamTimelineItems.length) {
  const selectBellinghamMilestone = (item, { moveFocus = false } = {}) => {
    const milestone = bellinghamMilestones[item.dataset.year];

    bellinghamTimelineItems.forEach((timelineItem) => {
      const selected = timelineItem === item;
      timelineItem.classList.toggle("active", selected);
      timelineItem.setAttribute("aria-selected", String(selected));
      timelineItem.tabIndex = selected ? 0 : -1;
    });

    bellinghamDetailNumber.textContent = milestone.number;
    bellinghamDetailLabel.textContent = milestone.label;
    bellinghamDetailTitle.textContent = milestone.title;
    bellinghamDetailCopy.textContent = milestone.copy;
    bellinghamMilestonePanel.setAttribute("aria-labelledby", item.id);

    if (moveFocus) item.focus();
  };

  bellinghamTimelineItems.forEach((item) => {
    item.addEventListener("click", () => selectBellinghamMilestone(item));
  });

  bellinghamTimelineList.addEventListener("keydown", (event) => {
    const currentIndex = bellinghamTimelineItems.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let targetIndex = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        targetIndex = (currentIndex + 1) % bellinghamTimelineItems.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        targetIndex = (currentIndex - 1 + bellinghamTimelineItems.length) % bellinghamTimelineItems.length;
        break;
      case "Home":
        targetIndex = 0;
        break;
      case "End":
        targetIndex = bellinghamTimelineItems.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectBellinghamMilestone(bellinghamTimelineItems[targetIndex], { moveFocus: true });
  });
}
