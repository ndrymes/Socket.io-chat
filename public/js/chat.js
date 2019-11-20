const socket = io();

const message_template = document.querySelector("#message-template").innerHTML;
const location_template = document.querySelector("#location-template")
  .innerHTML;
const $message_render = document.querySelector("#message-render");
const $inputForm = document.querySelector("#work");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
socket.on("everyy", value => {
  console.log("value", value);

  const date = moment(value.date).format("h:m a");
  const html = Mustache.render(message_template, {
    message: value.message,
    date
  });
  $message_render.insertAdjacentHTML("beforebegin", html);
});

socket.on("location_message", location => {
  const date = moment(location.date).format("h:mm a");
  const html = Mustache.render(location_template, {
    location: location.message,
    date
  });
  $message_render.insertAdjacentHTML("beforebegin", html);
});

document.querySelector("#workd").addEventListener("click", () => {
  let val = $inputForm.value;
  document.querySelector("#workd").setAttribute("disabled", "disabled");
  $inputForm.focus();
  socket.emit("displays", val, error => {
    $inputForm.value = " ";

    document.querySelector("#workd").removeAttribute("disabled");
    if (error) {
      return console.log(error);
    }

    console.log("succesfully sent");
  });
});

document.querySelector("#location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("not compatible");
  }
  document.querySelector("#location").setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    let value = { lat, long };
    console.log("value", value);

    socket.emit("location", value, error => {
      if (error) {
        document.querySelector("#location").removeAttribute("disabled");
        return console.log(error);
      }
      document.querySelector("#location").removeAttribute("disabled");
      console.log("location shared");
    });
  });
});
socket.emit("join", { username, room }, error => {
  if (error) {
    alert(error);
    location.href = "./";
  }
});
