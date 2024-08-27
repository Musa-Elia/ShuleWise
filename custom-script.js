document.addEventListener("DOMContentLoaded", () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();

    const day = document.querySelector(".calendar-dates");
    const currdate = document.querySelector(".calendar-current-date");
    const prevButton = document.querySelector("#calendar-prev");
    const nextButton = document.querySelector("#calendar-next");

    // Array of month names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Array of Tanzanian national holidays
    const nationalHolidays = [
        { date: "2024-01-01", name: "New Year's Day" },
        { date: "2024-02-14", name: "Valentine's Day" },
        { date: "2024-04-07", name: "Good Friday" },
        { date: "2024-04-10", name: "Easter Monday" },
        { date: "2024-05-01", name: "Labour Day" },
        { date: "2024-07-07", name: "Saba Saba" },
        { date: "2024-08-08", name: "Nane Nane" },
        { date: "2024-08-11", name: "Lubango's Birthday"},
        { date: "2024-12-25", name: "Christmas Day" },
        { date: "2024-12-26", name: "Boxing Day" }
    ];

    // Array of custom events
    const customEvents = [
        { date: "2024-01-11", name: "School Opening" },
        { date: "2024-01-10", name: "Project Deadline" },
        { date: "2024-02-20", name: "Team Meeting" }
    ];

    const renderCalendar = () => {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
        const lastDay = new Date(year, month, lastDate).getDay();

        let calendarHTML = "";

        // Add last days of the previous month
        for (let i = firstDay; i > 0; i--) {
            calendarHTML += `<li class="inactive">${lastDayOfPrevMonth - i + 1}</li>`;
        }

        // Add days of the current month
        for (let i = 1; i <= lastDate; i++) {
            const isToday = i === date.getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "active" : "";
            calendarHTML += `<li class="${isToday}">${i}</li>`;
        }

        // Add first days of the next month
        for (let i = lastDay; i < 6; i++) {
            calendarHTML += `<li class="inactive">${i - lastDay + 1}</li>`;
        }

        currdate.innerText = `${months[month]} ${year}`;
        day.innerHTML = calendarHTML;

        // Add holidays and custom events
        const eventsContainer = document.querySelector(".calendar-events");
        eventsContainer.innerHTML = "";

        nationalHolidays.concat(customEvents).forEach(event => {
            if (event.date.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)) {
                const eventDate = parseInt(event.date.split('-')[2]);
                eventsContainer.innerHTML += `<li>${eventDate}: ${event.name}</li>`;
            }
        });
    };

    const updateMonth = (increment) => {
        month += increment;

        if (month < 0) {
            month = 11;
            year--;
        } else if (month > 11) {
            month = 0;
            year++;
        }

        renderCalendar();
    };

    prevButton.addEventListener("click", () => updateMonth(-1));
    nextButton.addEventListener("click", () => updateMonth(1));

    renderCalendar();
});



// ON SCROLL ANIMATION
// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Function to add the reveal class when elements come into view
function revealOnScroll() {
    const elements = document.querySelectorAll('.card-box');

    elements.forEach((element, index) => {
        if (isInViewport(element)) {
            element.classList.add('reveal', `reveal-delay-${index}`);
        }
    });
}

// Attach the function to the scroll event
window.addEventListener('scroll', revealOnScroll);

// Trigger the function on page load to check the initial visibility
revealOnScroll();

