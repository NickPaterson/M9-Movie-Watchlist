
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]')
// if local storage theme is dark apply dark theme
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark')
    toggleSwitch.checked = true
}

function switchTheme(e) {
    // set local storage
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }   
}

toggleSwitch.addEventListener('change', switchTheme, false)

