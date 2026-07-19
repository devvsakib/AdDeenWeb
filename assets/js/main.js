const targetDate = new Date(2026, 8, 1).getTime();

const updateCountdown = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference < 0) {
        document.querySelector(".countdown").innerHTML =
            "<p style='color:#0d9488; font-weight:500;'>আলহামদুলিল্লাহ, আমরা এখন লাইভে আছি!</p>";
        clearInterval(intervalId);
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const mins = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const secs = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days
        .toString()
        .padStart(2, "0");
    document.getElementById("hours").innerText = hours
        .toString()
        .padStart(2, "0");
    document.getElementById("mins").innerText = mins
        .toString()
        .padStart(2, "0");
    document.getElementById("secs").innerText = secs
        .toString()
        .padStart(2, "0");
};

const intervalId = setInterval(updateCountdown, 1000);
updateCountdown();
