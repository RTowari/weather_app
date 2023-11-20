document.querySelector(".add-button").addEventListener("click", render_form)

// Render form for the user to write a location
function render_form(e) {

    set_overlay("enable"); //Enable overlay
    set_form();
}

// Take info from form an ask API for data
function submit_form(e) {
    e.preventDefault();

    console.log(e)
}




function set_overlay(option) {
    document.querySelector(".overlay").style.display= "block";
}
 

function set_form() {
    const position = document.querySelector("body");
    const form = `
    <div class="location-form">
        <form>
            <label for="location-name">Location:</label>
            <input type="text" id="location-name" name="location-name">
            <input type="submit" value="Submit">
        </form>
    </div>
    `
    position.insertAdjacentHTML("afterbegin", form);

    document.querySelector(".location-form form").addEventListener("submit", submit_form, { once: true });
}

