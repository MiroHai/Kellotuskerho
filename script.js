let copyCount = 0;

fetch('/getCount')
  .then(response => response.json())
  .then(data => {
    copyCount = data.count;
    document.getElementById("counter").innerText = copyCount;
  });

function copyToClipboard() {
  const fields = [
    { label: "1. Meidän PJ", id: "input1" },
    { label: "2. Sihteeri", id: "input2" },
    { label: "3. Sijainti", id: "input3" },
    { label: "4. Avataan", id: "input4" },
    { label: "5. Kellotetaan", id: "input5" },
    { label: "6. Uusia jäseniä?", id: "input6" },
    { label: "7. Jäpättävää", id: "input7" },
  ];

  let firstThree = `${fields[0].label}: ${document.getElementById(fields[0].id).value}\n` +
                   `${fields[1].label}: ${document.getElementById(fields[1].id).value}\n` +
                   `${fields[2].label}: ${document.getElementById(fields[2].id).value}`;

  let otherLines = fields.slice(3).map(
    (field) => {
      let inputValue = document.getElementById(field.id).value;
      return `${field.label}:\n${inputValue}`;
    }
  ).join("\n\n");

  let allInputs = `${firstThree}\n\n${otherLines}`;

  let tempTextarea = document.createElement("textarea");
  tempTextarea.value = allInputs;

  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);

  copyCount++;
  document.getElementById("counter").innerText = copyCount;

  fetch('/updateCount', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ count: copyCount })
  });

  alert("Kopioitu!");
}
